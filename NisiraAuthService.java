package com.procesadoraperu.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Gestiona la autenticación contra la API PPSAC (ERP Nisira).
 *
 * Flujo:
 *  1. Al primer uso llama a POST /api/auth/login con las credenciales
 *     configuradas en application.properties.
 *  2. Cachea el accessToken y registra cuándo vence (expiresIn).
 *  3. Si quedan < 60 s para vencer, renueva con POST /api/auth/refresh-token.
 *  4. Expone getAccessToken() que siempre devuelve un token válido.
 *
 * Todos los servicios que llaman a Nisira inyectan este bean para
 * obtener el Bearer token.
 */
@Service
public class NisiraAuthService {

    @Value("${app.nisira.url-base}")
    private String urlBase;

    @Value("${app.nisira.username}")
    private String nisiraUsername;

    @Value("${app.nisira.password}")
    private String nisiraPassword;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ReentrantLock lock        = new ReentrantLock();

    private String  accessToken;
    private String  refreshToken;
    private Instant expiresAt;

    // ── API pública ──────────────────────────────────────────────

    /**
     * Devuelve un accessToken válido, renovando si es necesario.
     * Thread-safe.
     */
    public String getAccessToken() {
        lock.lock();
        try {
            if (accessToken == null || Instant.now().isAfter(expiresAt.minusSeconds(60))) {
                if (refreshToken != null && Instant.now().isBefore(expiresAt)) {
                    renovarToken();
                } else {
                    login();
                }
            }
            return accessToken;
        } finally {
            lock.unlock();
        }
    }

    /**
     * Construye las cabeceras HTTP estándar con el Bearer token.
     * Uso: restTemplate.exchange(url, method, new HttpEntity<>(body, authHeaders()), ...)
     */
    public HttpHeaders authHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Accept", "application/json");
        headers.setBearerAuth(getAccessToken());
        return headers;
    }

    // ── Privados ─────────────────────────────────────────────────

    @SuppressWarnings("unchecked")
    private void login() {
        String url = urlBase + "/api/auth/login";

        Map<String, String> body = Map.of(
            "username", nisiraUsername,
            "password", nisiraPassword
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        ResponseEntity<Map> respuesta = restTemplate.postForEntity(
            url, new HttpEntity<>(body, headers), Map.class
        );

        Map<String, Object> data = respuesta.getBody();
        if (data == null) throw new RuntimeException("Nisira login: respuesta vacía");

        guardarTokens(data);
    }

    @SuppressWarnings("unchecked")
    private void renovarToken() {
        String url = urlBase + "/api/auth/refresh-token";

        Map<String, String> body = Map.of("refreshToken", refreshToken);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        try {
            ResponseEntity<Map> respuesta = restTemplate.postForEntity(
                url, new HttpEntity<>(body, headers), Map.class
            );
            Map<String, Object> data = respuesta.getBody();
            if (data == null) throw new RuntimeException("Nisira refresh-token: respuesta vacía");

            this.accessToken = (String) data.get("accessToken");
            int segundos = (int) data.getOrDefault("expiresIn", 600);
            this.expiresAt = Instant.now().plusSeconds(segundos);

        } catch (Exception ex) {
            // Si falla el refresh, forzar re-login completo
            this.refreshToken = null;
            login();
        }
    }

    @SuppressWarnings("unchecked")
    private void guardarTokens(Map<String, Object> data) {
        this.accessToken  = (String) data.get("accessToken");
        this.refreshToken = (String) data.get("refreshToken");
        int segundos = (int) data.getOrDefault("expiresIn", 600);
        this.expiresAt = Instant.now().plusSeconds(segundos);
    }
}
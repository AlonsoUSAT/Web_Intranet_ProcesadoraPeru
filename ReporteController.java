package com.procesadoraperu.controller;

import com.procesadoraperu.service.ReporteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Controlador REST para el módulo de Reportes.
 *
 * Endpoints:
 *   GET  /api/reportes/operarios/conteo
 *       → Cuántos reportes ha generado cada operario hoy
 *
 *   POST /api/reportes/enviar-correo
 *       → Envía el reporte del día por correo a Jefe de Ops, Admin y Gerente
 *       Body: { "idSucursal": "...", "idAlmacen": "..." }
 *
 * Todos los endpoints son públicos en esta etapa (seguridad pendiente).
 */
@RestController
@RequestMapping("/api/reportes")
@CrossOrigin(origins = "*")
public class ReporteController {

    private final ReporteService reporteService;

    public ReporteController(ReporteService reporteService) {
        this.reporteService = reporteService;
    }

    /**
     * GET /api/reportes/operarios/conteo
     *
     * Devuelve cuántos registros de inventario ha realizado cada operario
     * en el día de hoy, ordenado de mayor a menor.
     *
     * Ejemplo de respuesta:
     * [
     *   { "usuario": "Juan Pérez", "totalReportes": 8, "ultimoProducto": "Mango Kent", "ultimaFecha": "01/06/2026 10:32" },
     *   ...
     * ]
     */
    @GetMapping("/operarios/conteo")
    public ResponseEntity<List<Map<String, Object>>> getConteoReportes() {
        return ResponseEntity.ok(reporteService.getConteoReportesPorOperario());
    }

    /**
     * POST /api/reportes/enviar-correo
     *
     * Genera y envía el reporte diario por correo electrónico.
     * Destinatarios: Jefe de Operaciones, Administrador, Gerente General
     * (configurados en application.properties).
     *
     * Body:
     * {
     *   "idSucursal": "S001",
     *   "idAlmacen":  "A001"
     * }
     */
    @PostMapping("/enviar-correo")
    public ResponseEntity<Map<String, Object>> enviarReporte(
            @RequestBody Map<String, String> body) {

        String idSucursal = body.get("idSucursal");
        String idAlmacen  = body.get("idAlmacen");

        if (idSucursal == null || idAlmacen == null) {
            return ResponseEntity.badRequest()
                .body(Map.of("ok", false, "mensaje", "Se requieren idSucursal e idAlmacen"));
        }

        boolean enviado = reporteService.enviarReporteDiario(idSucursal, idAlmacen);

        if (enviado) {
            return ResponseEntity.ok(Map.of(
                "ok", true,
                "mensaje", "Reporte enviado a Jefe de Operaciones, Administrador y Gerente General."
            ));
        } else {
            return ResponseEntity.internalServerError()
                .body(Map.of("ok", false, "mensaje", "Error al enviar el correo. Revisar logs."));
        }
    }
}
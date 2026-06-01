package com.procesadoraperu.service;

import com.procesadoraperu.model.nisira.InventarioNisiraDTO;
import com.procesadoraperu.repository.ClienteRepository;
import com.procesadoraperu.repository.InventarioRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Servicio de reportes del sistema.
 *
 * Funcionalidades:
 *  1. Generar reporte de operarios activos con conteo de reportes por persona.
 *  2. Generar reporte de inventario del día (conectado a Nisira).
 *  3. Enviar reporte por correo a Jefe de Operaciones, Administrador y Gerente General.
 *
 * Los correos se envían en HTML con tabla resumen.
 * El stock y la cantidad NO se incluyen en ningún correo ni reporte público.
 */
@Service
public class ReporteService {

    private final InventarioRepository    inventarioRepository;
    private final ClienteRepository       clienteRepository;
    private final NisiraInventarioService nisiraService;
    private final JavaMailSender          mailSender;

    @Value("${app.mail.from}")
    private String mailFrom;

    @Value("${app.mail.destinatarios.jefe-operaciones}")
    private String mailJefeOps;

    @Value("${app.mail.destinatarios.administrador}")
    private String mailAdmin;

    @Value("${app.mail.destinatarios.gerente-general}")
    private String mailGerente;

    public ReporteService(InventarioRepository inventarioRepository,
                          ClienteRepository clienteRepository,
                          NisiraInventarioService nisiraService,
                          JavaMailSender mailSender) {
        this.inventarioRepository = inventarioRepository;
        this.clienteRepository    = clienteRepository;
        this.nisiraService        = nisiraService;
        this.mailSender           = mailSender;
    }

    // ─────────────────────────────────────────────────────────────
    //  Reporte de Operarios: reportes por persona
    // ─────────────────────────────────────────────────────────────

    /**
     * Cuenta cuántos registros de inventario ha generado cada operario hoy.
     * Agrupa por `usuarioCreacion` de la tabla local `inventario`.
     *
     * @return Lista de {idOperario, nombres, totalReportes, ultimoProducto, ultimaFecha}
     */
    public List<Map<String, Object>> getConteoReportesPorOperario() {
        LocalDateTime inicioDia = LocalDate.now().atStartOfDay();

        // Usamos la query existente del repositorio (inventarios del día)
        var inventariosHoy = inventarioRepository.buscarRutasDelDia(inicioDia);

        // Agrupar por usuarioCreacion
        Map<String, List<com.procesadoraperu.model.Inventario>> porUsuario =
            inventariosHoy.stream()
                .filter(i -> i.getUsuarioCreacion() != null)
                .collect(Collectors.groupingBy(com.procesadoraperu.model.Inventario::getUsuarioCreacion));

        List<Map<String, Object>> resultado = new ArrayList<>();

        porUsuario.forEach((usuario, registros) -> {
            Map<String, Object> fila = new LinkedHashMap<>();
            fila.put("usuario",        usuario);
            fila.put("totalReportes",  registros.size());
            fila.put("ultimoProducto", registros.getLast().getProducto());
            fila.put("ultimaFecha",    registros.getLast().getFechaCreacion()
                                            .format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")));
            resultado.add(fila);
        });

        // Ordenar por totalReportes descendente
        resultado.sort((a, b) ->
            Integer.compare((int) b.get("totalReportes"), (int) a.get("totalReportes")));

        return resultado;
    }

    // ─────────────────────────────────────────────────────────────
    //  Enviar reporte por correo
    // ─────────────────────────────────────────────────────────────

    /**
     * Genera y envía el reporte del día a los tres destinatarios configurados.
     * Incluye:
     *   - Resumen de operarios y cantidad de reportes por persona
     *   - Inventario registrado en el día (sin stock ni cantidad)
     *
     * @param idSucursal  Sucursal a reportar (de Nisira)
     * @param idAlmacen   Almacén a reportar (de Nisira)
     * @return true si el correo fue enviado exitosamente
     */
    public boolean enviarReporteDiario(String idSucursal, String idAlmacen) {
        try {
            String fechaHoy     = LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
            String fechaNisira  = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));

            // Datos de operarios
            List<Map<String, Object>> reportesOperarios = getConteoReportesPorOperario();

            // Datos de inventario del día desde Nisira (sin stock/cantidad en el HTML)
            List<InventarioNisiraDTO> inventarioDia = List.of(); // default vacío
            try {
                inventarioDia = nisiraService.consultarInventario(
                    idSucursal, idAlmacen, fechaNisira, fechaNisira);
            } catch (Exception ex) {
                // Si Nisira no responde, continuar con datos vacíos
            }

            String htmlBody = construirHtmlReporte(fechaHoy, reportesOperarios, inventarioDia);

            String[] destinatarios = {mailJefeOps, mailAdmin, mailGerente};

            for (String dest : destinatarios) {
                if (dest == null || dest.isBlank()) continue;
                enviarCorreoHtml(
                    dest,
                    "Reporte Diario de Operaciones — " + fechaHoy + " | Procesadora Perú S.A.C.",
                    htmlBody
                );
            }

            return true;

        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }
    }

    // ─────────────────────────────────────────────────────────────
    //  HTML del correo
    // ─────────────────────────────────────────────────────────────

    private String construirHtmlReporte(
            String fecha,
            List<Map<String, Object>> operarios,
            List<InventarioNisiraDTO> inventario) {

        StringBuilder sb = new StringBuilder();
        sb.append("""
            <!DOCTYPE html>
            <html lang="es">
            <head>
              <meta charset="UTF-8"/>
              <style>
                body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; }
                .header { background: #e05c1a; color: white; padding: 20px 30px; }
                .header h1 { margin: 0; font-size: 20px; }
                .header p  { margin: 4px 0 0; font-size: 13px; opacity: .85; }
                .section   { padding: 20px 30px; }
                .section h2 { font-size: 15px; color: #e05c1a; border-bottom: 2px solid #e05c1a;
                              padding-bottom: 6px; margin-bottom: 12px; }
                table { width: 100%; border-collapse: collapse; font-size: 13px; }
                th { background: #f5f5f5; text-align: left; padding: 8px 10px;
                     border-bottom: 2px solid #ddd; }
                td { padding: 7px 10px; border-bottom: 1px solid #eee; }
                tr:hover td { background: #fafafa; }
                .badge { display: inline-block; background: #e05c1a; color: white;
                         border-radius: 12px; padding: 2px 9px; font-size: 12px; }
                .footer { background: #f9f9f9; padding: 14px 30px; font-size: 11px;
                          color: #888; border-top: 1px solid #eee; }
              </style>
            </head>
            <body>
            """);

        // Header
        sb.append("<div class='header'>")
          .append("<h1>Procesadora Perú S.A.C. — Reporte Diario de Operaciones</h1>")
          .append("<p>Fecha: ").append(fecha).append(" | Sistema de Monitoreo GIS</p>")
          .append("</div>");

        // Sección 1: Operarios
        sb.append("<div class='section'>")
          .append("<h2>Operarios — Reportes registrados hoy</h2>")
          .append("<table>")
          .append("<tr><th>Operario</th><th>Reportes</th><th>Último producto</th><th>Última actividad</th></tr>");

        if (operarios.isEmpty()) {
            sb.append("<tr><td colspan='4' style='color:#999;text-align:center;'>Sin actividad registrada hoy</td></tr>");
        } else {
            for (Map<String, Object> op : operarios) {
                sb.append("<tr>")
                  .append("<td>").append(op.get("usuario")).append("</td>")
                  .append("<td><span class='badge'>").append(op.get("totalReportes")).append("</span></td>")
                  .append("<td>").append(op.getOrDefault("ultimoProducto", "—")).append("</td>")
                  .append("<td>").append(op.getOrDefault("ultimaFecha", "—")).append("</td>")
                  .append("</tr>");
            }
        }
        sb.append("</table></div>");

        // Sección 2: Inventario (sin stock, sin cantidad)
        sb.append("<div class='section'>")
          .append("<h2>Inventario registrado hoy (por almacén)</h2>")
          .append("<table>")
          .append("<tr><th>Producto</th><th>Unidad de medida</th><th>Almacén</th><th>Fecha registro</th></tr>");

        if (inventario.isEmpty()) {
            sb.append("<tr><td colspan='4' style='color:#999;text-align:center;'>Sin registros de inventario hoy</td></tr>");
        } else {
            for (InventarioNisiraDTO inv : inventario) {
                sb.append("<tr>")
                  .append("<td>").append(inv.getProducto()).append("</td>")
                  .append("<td>").append(inv.getUnidadMedida()).append("</td>")
                  .append("<td>").append(inv.getAlmacen()).append("</td>")
                  .append("<td>").append(inv.getFechaCreacion() != null
                      ? inv.getFechaCreacion().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm"))
                      : "—").append("</td>")
                  .append("</tr>");
            }
        }
        sb.append("</table></div>");

        // Footer
        sb.append("<div class='footer'>")
          .append("Este mensaje fue generado automáticamente por el Sistema de Monitoreo GIS de Procesadora Perú S.A.C.<br/>")
          .append("No responder a este correo.")
          .append("</div></body></html>");

        return sb.toString();
    }

    private void enviarCorreoHtml(String destinatario, String asunto, String htmlBody)
            throws Exception {
        MimeMessage mensaje = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mensaje, true, "UTF-8");
        helper.setFrom(mailFrom);
        helper.setTo(destinatario);
        helper.setSubject(asunto);
        helper.setText(htmlBody, true);
        mailSender.send(mensaje);
    }
}
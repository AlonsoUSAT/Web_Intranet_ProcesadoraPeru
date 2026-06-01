package com.procesadoraperu.controller;

import com.procesadoraperu.model.nisira.InventarioNisiraDTO;
import com.procesadoraperu.service.NisiraInventarioService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

/**
 * Endpoints de Inventario para la INTRANET (uso interno, no para operarios).
 *
 * Aquí SÍ se muestran cantidad y stock porque el destinatario es el
 * personal administrativo que accede desde la web interna.
 *
 * Endpoints:
 *   GET /api/inventario/consultar?idSucursal=...&idAlmacen=...&fechaInicio=...&fechaFin=...
 */
@RestController
@RequestMapping("/api/inventario")
@CrossOrigin(origins = "*")
public class InventarioController {

    private final NisiraInventarioService nisiraService;

    public InventarioController(NisiraInventarioService nisiraService) {
        this.nisiraService = nisiraService;
    }

    /**
     * GET /api/inventario/consultar
     *
     * Consulta los registros de inventario para la intranet.
     * Parámetros:
     *   idSucursal  → Identificador de sucursal
     *   idAlmacen   → Identificador de almacén
     *   fechaInicio → Fecha inicio (formato: yyyy-MM-dd)  Ej: 2026-06-01
     *   fechaFin    → Fecha fin    (formato: yyyy-MM-dd)
     *
     * Devuelve lista completa incluyendo unidadMedida.
     * La cantidad y el stock son visibles en la intranet para administración.
     */
    @GetMapping("/consultar")
    public ResponseEntity<?> consultarInventario(
            @RequestParam String idSucursal,
            @RequestParam String idAlmacen,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {

        try {
            DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyyMMdd");
            List<InventarioNisiraDTO> registros = nisiraService.consultarInventario(
                idSucursal, idAlmacen,
                fechaInicio.format(fmt),
                fechaFin.format(fmt)
            );
            return ResponseEntity.ok(registros);
        } catch (Exception ex) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Error al consultar inventario: " + ex.getMessage()));
        }
    }

    /**
     * GET /api/inventario/sucursales
     * Lista de sucursales disponibles (para el selector de la intranet).
     */
    @GetMapping("/sucursales")
    public ResponseEntity<?> getSucursales() {
        try {
            return ResponseEntity.ok(nisiraService.getSucursales());
        } catch (Exception ex) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", ex.getMessage()));
        }
    }

    /**
     * GET /api/inventario/almacenes/{idSucursal}
     * Lista de almacenes de una sucursal (para el selector de la intranet).
     */
    @GetMapping("/almacenes/{idSucursal}")
    public ResponseEntity<?> getAlmacenes(@PathVariable String idSucursal) {
        try {
            return ResponseEntity.ok(nisiraService.getAlmacenes(idSucursal));
        } catch (Exception ex) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", ex.getMessage()));
        }
    }
}
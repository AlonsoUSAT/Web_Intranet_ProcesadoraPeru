package com.procesadoraperu.controller;

import com.procesadoraperu.model.nisira.*;
import com.procesadoraperu.service.NisiraInventarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Endpoints de catálogo para sincronización previa en la app Android.
 *
 * La app Android descarga el catálogo ANTES de salir al campo (cuando
 * aún tiene conexión WiFi/datos), lo almacena localmente (Room DB) y
 * lo usa offline durante el registro de inventario.
 *
 * REGLA DE PRIVACIDAD:
 *   Todos los endpoints de este controlador omiten stock y cantidad.
 *   El operario solo ve: nombre del producto y unidad de medida.
 *
 * Endpoints:
 *   GET /api/catalogo/sucursales
 *   GET /api/catalogo/sucursales/{idSucursal}/almacenes
 *   GET /api/catalogo/productos?idSucursal=...&idAlmacen=...
 *       → Lista de productos del almacén sin stock (para sincronización)
 *   POST /api/catalogo/inventario/registrar
 *       → El operario envía un registro de inventario desde la app
 */
@RestController
@RequestMapping("/api/catalogo")
@CrossOrigin(origins = "*")
public class CatalogoController {

    private final NisiraInventarioService nisiraService;

    public CatalogoController(NisiraInventarioService nisiraService) {
        this.nisiraService = nisiraService;
    }

    /**
     * GET /api/catalogo/sucursales
     * Lista de sucursales (para que el operario seleccione su sucursal).
     */
    @GetMapping("/sucursales")
    public ResponseEntity<List<SucursalDTO>> getSucursales() {
        return ResponseEntity.ok(nisiraService.getSucursales());
    }

    /**
     * GET /api/catalogo/sucursales/{idSucursal}/almacenes
     * Lista de almacenes de la sucursal seleccionada.
     */
    @GetMapping("/sucursales/{idSucursal}/almacenes")
    public ResponseEntity<List<AlmacenDTO>> getAlmacenes(
            @PathVariable String idSucursal) {
        return ResponseEntity.ok(nisiraService.getAlmacenes(idSucursal));
    }

    /**
     * GET /api/catalogo/productos?idSucursal=...&idAlmacen=...&idProducto=...
     *
     * Devuelve la información del producto SIN stock ni cantidad.
     * Incluye nombre + unidad de medida (validada según SI / INDECOPI).
     *
     * Este endpoint es el que llama la app Android al sincronizar.
     *
     * Ejemplo respuesta:
     * {
     *   "idProducto":       "P001",
     *   "descripcion":      "Mango Kent",
     *   "nombreComercial":  "Mango Kent fresco",
     *   "idMedida":         "kg",
     *   "medidaDescripcion":"Kilogramo (kg)",
     *   "idGrupo":          "G01",
     *   "grupoDsc":         "Frutas",
     *   ...
     * }
     */
    @GetMapping("/productos")
    public ResponseEntity<?> getProductoCatalogo(
            @RequestParam String idSucursal,
            @RequestParam String idAlmacen,
            @RequestParam String idProducto) {

        try {
            CatalogoProductoDTO catalogo = nisiraService.getProductoCatalogo(
                idSucursal, idAlmacen, idProducto);
            return ResponseEntity.ok(catalogo);
        } catch (Exception ex) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "No se pudo obtener el producto: " + ex.getMessage()));
        }
    }

    /**
     * POST /api/catalogo/inventario/registrar
     *
     * El operario envía el registro de inventario desde la app Android.
     * La app incluye su ubicación GPS, dispositivo y datos del producto.
     *
     * El backend reenvía a Nisira vía POST /api/almacen/inventario/create.
     */
    @PostMapping("/inventario/registrar")
    public ResponseEntity<Map<String, Object>> registrarInventario(
            @RequestBody RegistrarInventarioRequest request) {

        try {
            String resultado = nisiraService.registrarInventario(request);
            return ResponseEntity.ok(Map.of(
                "ok",       true,
                "resultado", resultado != null ? resultado : "Registrado correctamente"
            ));
        } catch (Exception ex) {
            return ResponseEntity.internalServerError()
                .body(Map.of("ok", false, "error", ex.getMessage()));
        }
    }
}
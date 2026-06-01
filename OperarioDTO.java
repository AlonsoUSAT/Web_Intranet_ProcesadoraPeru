package com.procesadoraperu.model;

import java.math.BigDecimal;

/**
 * DTO (Data Transfer Object) que combina datos de las tablas
 * `cliente` e `inventario` para el endpoint GET /api/operarios.
 *
 * Se usa para evitar exponer directamente las entidades JPA y
 * para incluir el campo `producto` del inventario.
 */
public class OperarioDTO {

    private Long      idCliente;
    private String    nombres;
    private BigDecimal latitud;
    private BigDecimal longitud;
    private String    dispositivo;
    private String    producto;  // viene de la tabla inventario

    // ── Constructor completo ─────────────────────────

    public OperarioDTO(Long idCliente, String nombres,
                       BigDecimal latitud, BigDecimal longitud,
                       String dispositivo, String producto) {
        this.idCliente   = idCliente;
        this.nombres     = nombres;
        this.latitud     = latitud;
        this.longitud    = longitud;
        this.dispositivo = dispositivo;
        this.producto    = producto;
    }

    // ── Getters ──────────────────────────────────────

    public Long      getIdCliente()   { return idCliente; }
    public String    getNombres()     { return nombres; }
    public BigDecimal getLatitud()    { return latitud; }
    public BigDecimal getLongitud()   { return longitud; }
    public String    getDispositivo() { return dispositivo; }
    public String    getProducto()    { return producto; }
}

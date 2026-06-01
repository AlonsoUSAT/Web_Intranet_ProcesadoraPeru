package com.procesadoraperu.model.nisira;

import java.math.BigDecimal;
import java.time.LocalDateTime;

// ═══════════════════════════════════════════════════════════════
//  Respuesta de consulta de inventario (POST /api/almacen/inventario)
// ═══════════════════════════════════════════════════════════════

public class InventarioNisiraDTO {

    private String        idInventario;
    private String        idSucursal;
    private String        sucursal;
    private String        idAlmacen;
    private String        almacen;
    private String        idProducto;
    private String        producto;
    private String        unidadMedida;
    private BigDecimal    cantidad;      // ← SOLO para intranet/admin, no exponer a operarios
    private BigDecimal    stock;         // ← SOLO para intranet/admin, no exponer a operarios
    private LocalDateTime fechaCreacion;

    // Getters
    public String        getIdInventario()  { return idInventario; }
    public String        getIdSucursal()    { return idSucursal; }
    public String        getSucursal()      { return sucursal; }
    public String        getIdAlmacen()     { return idAlmacen; }
    public String        getAlmacen()       { return almacen; }
    public String        getIdProducto()    { return idProducto; }
    public String        getProducto()      { return producto; }
    public String        getUnidadMedida()  { return unidadMedida; }
    public BigDecimal    getCantidad()      { return cantidad; }
    public BigDecimal    getStock()         { return stock; }
    public LocalDateTime getFechaCreacion() { return fechaCreacion; }

    // Setters
    public void setIdInventario(String v)      { this.idInventario = v; }
    public void setIdSucursal(String v)        { this.idSucursal = v; }
    public void setSucursal(String v)          { this.sucursal = v; }
    public void setIdAlmacen(String v)         { this.idAlmacen = v; }
    public void setAlmacen(String v)           { this.almacen = v; }
    public void setIdProducto(String v)        { this.idProducto = v; }
    public void setProducto(String v)          { this.producto = v; }
    public void setUnidadMedida(String v)      { this.unidadMedida = v; }
    public void setCantidad(BigDecimal v)      { this.cantidad = v; }
    public void setStock(BigDecimal v)         { this.stock = v; }
    public void setFechaCreacion(LocalDateTime v) { this.fechaCreacion = v; }
}
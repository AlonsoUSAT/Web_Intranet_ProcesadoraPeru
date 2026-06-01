package com.procesadoraperu.model.nisira;

// ═══════════════════════════════════════════════════════════════
//  Sucursal
// ═══════════════════════════════════════════════════════════════

class SucursalDTO {
    private String idSucursal;
    private String descripcion;

    public String getIdSucursal()   { return idSucursal; }
    public String getDescripcion()  { return descripcion; }
    public void setIdSucursal(String v)  { this.idSucursal = v; }
    public void setDescripcion(String v) { this.descripcion = v; }
}
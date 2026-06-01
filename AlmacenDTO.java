package com.procesadoraperu.model.nisira;

public class AlmacenDTO {
    private String idSucursal;
    private String idAlmacen;
    private String descripcion;

    public String getIdSucursal()   { return idSucursal; }
    public String getIdAlmacen()    { return idAlmacen; }
    public String getDescripcion()  { return descripcion; }
    public void setIdSucursal(String v)  { this.idSucursal = v; }
    public void setIdAlmacen(String v)   { this.idAlmacen = v; }
    public void setDescripcion(String v) { this.descripcion = v; }
}
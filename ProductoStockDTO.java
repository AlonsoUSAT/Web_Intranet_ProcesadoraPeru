package com.procesadoraperu.model.nisira;

import java.math.BigDecimal;

/**
 * Respuesta completa del endpoint POST /api/nisira/producto-stock.
 *
 * ATENCIÓN: Este DTO contiene el campo `stock` que NO debe exponerse
 * directamente en endpoints públicos ni en la app del operario.
 * Usar CatalogoProductoDTO para comunicación con el exterior.
 */
public class ProductoStockDTO {

    private String     idProducto;
    private String     descripcion;
    private String     idGrupo;
    private String     grupoDsc;
    private String     idSubgrupo;
    private String     subgrupoDsc;
    private String     idMedida;
    private String     nombreComercial;
    private BigDecimal stock;         // ← PRIVADO: no exponer en API pública

    // Getters
    public String     getIdProducto()     { return idProducto; }
    public String     getDescripcion()    { return descripcion; }
    public String     getIdGrupo()        { return idGrupo; }
    public String     getGrupoDsc()       { return grupoDsc; }
    public String     getIdSubgrupo()     { return idSubgrupo; }
    public String     getSubgrupoDsc()    { return subgrupoDsc; }
    public String     getIdMedida()       { return idMedida; }
    public String     getNombreComercial(){ return nombreComercial; }
    public BigDecimal getStock()          { return stock; }

    // Setters
    public void setIdProducto(String v)      { this.idProducto = v; }
    public void setDescripcion(String v)     { this.descripcion = v; }
    public void setIdGrupo(String v)         { this.idGrupo = v; }
    public void setGrupoDsc(String v)        { this.grupoDsc = v; }
    public void setIdSubgrupo(String v)      { this.idSubgrupo = v; }
    public void setSubgrupoDsc(String v)     { this.subgrupoDsc = v; }
    public void setIdMedida(String v)        { this.idMedida = v; }
    public void setNombreComercial(String v) { this.nombreComercial = v; }
    public void setStock(BigDecimal v)       { this.stock = v; }
}
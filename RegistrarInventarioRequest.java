package com.procesadoraperu.model.nisira;

import java.math.BigDecimal;

/**
 * Body del endpoint POST /api/almacen/inventario/create.
 * Incluye la subclase ClientInfo para el campo clientInfo requerido.
 */
public class RegistrarInventarioRequest {

    private String     idEmpresa;
    private String     idSucursal;
    private String     idAlmacen;
    private String     idProducto;
    private String     dscProducto;
    private String     idMedida;
    private Integer    stockTemp;
    private BigDecimal cantidad;
    private ClientInfo clientInfo;

    // ── Getters / Setters ─────────────────────────────────────────
    public String     getIdEmpresa()   { return idEmpresa; }
    public String     getIdSucursal()  { return idSucursal; }
    public String     getIdAlmacen()   { return idAlmacen; }
    public String     getIdProducto()  { return idProducto; }
    public String     getDscProducto() { return dscProducto; }
    public String     getIdMedida()    { return idMedida; }
    public Integer    getStockTemp()   { return stockTemp; }
    public BigDecimal getCantidad()    { return cantidad; }
    public ClientInfo getClientInfo()  { return clientInfo; }

    public void setIdEmpresa(String v)     { this.idEmpresa = v; }
    public void setIdSucursal(String v)    { this.idSucursal = v; }
    public void setIdAlmacen(String v)     { this.idAlmacen = v; }
    public void setIdProducto(String v)    { this.idProducto = v; }
    public void setDscProducto(String v)   { this.dscProducto = v; }
    public void setIdMedida(String v)      { this.idMedida = v; }
    public void setStockTemp(Integer v)    { this.stockTemp = v; }
    public void setCantidad(BigDecimal v)  { this.cantidad = v; }
    public void setClientInfo(ClientInfo v){ this.clientInfo = v; }

    // ── ClientInfo ────────────────────────────────────────────────
    public static class ClientInfo {
        private String dispositivo;
        private String ip;
        private String hostname;
        private String userAgent;
        private String ubicacionGps;
        private String maquina;

        public String getDispositivo()  { return dispositivo; }
        public String getIp()           { return ip; }
        public String getHostname()     { return hostname; }
        public String getUserAgent()    { return userAgent; }
        public String getUbicacionGps() { return ubicacionGps; }
        public String getMaquina()      { return maquina; }

        public void setDispositivo(String v)  { this.dispositivo = v; }
        public void setIp(String v)           { this.ip = v; }
        public void setHostname(String v)     { this.hostname = v; }
        public void setUserAgent(String v)    { this.userAgent = v; }
        public void setUbicacionGps(String v) { this.ubicacionGps = v; }
        public void setMaquina(String v)      { this.maquina = v; }
    }
}
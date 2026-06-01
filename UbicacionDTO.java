package com.procesadoraperu.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class UbicacionDTO {
    private BigDecimal latitud;
    private BigDecimal longitud;
    private LocalDateTime timestampCaptura;

    public BigDecimal getLatitud() { return latitud; }
    public void setLatitud(BigDecimal latitud) { this.latitud = latitud; }
    public BigDecimal getLongitud() { return longitud; }
    public void setLongitud(BigDecimal longitud) { this.longitud = longitud; }
    public LocalDateTime getTimestampCaptura() { return timestampCaptura; }
    public void setTimestampCaptura(LocalDateTime timestampCaptura) { this.timestampCaptura = timestampCaptura; }
}
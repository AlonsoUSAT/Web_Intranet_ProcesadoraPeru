package com.procesadoraperu.model;

/**
 * DTO para el endpoint GET /api/zonas.
 *
 * Payload deliberadamente mínimo (solo geometría) para no saturar
 * el tráfico de red durante el polling de 15 segundos del frontend.
 */
public class ZonaAcopioDTO {

    private double latitudCentral;
    private double longitudCentral;
    private double radioMetros;

    public ZonaAcopioDTO(double latitudCentral, double longitudCentral, double radioMetros) {
        this.latitudCentral  = latitudCentral;
        this.longitudCentral = longitudCentral;
        this.radioMetros     = radioMetros;
    }

    public double getLatitudCentral()  { return latitudCentral; }
    public double getLongitudCentral() { return longitudCentral; }
    public double getRadioMetros()     { return radioMetros; }
}

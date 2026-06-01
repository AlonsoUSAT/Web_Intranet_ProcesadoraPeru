package com.procesadoraperu.model;

import jakarta.persistence.*;
import java.math.BigDecimal;


@Entity
@Table(name = "cliente")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idCliente")
    private Long idCliente;

    @Column(name = "nombres")
    private String nombres;

    @Column(name = "latitud", precision = 10, scale = 7)
    private BigDecimal latitud;

    @Column(name = "longitud", precision = 10, scale = 7)
    private BigDecimal longitud;

    @Column(name = "dispositivo")
    private String dispositivo;

    // ── Getters y Setters ────────────────────────────

    public Long getIdCliente(){ 
        return idCliente; 
    }
    public void setIdCliente(Long id){ 
        this.idCliente = id; 
    }

    public String getNombres(){ 
        return nombres; 
    }
    public void setNombres(String n)       { this.nombres = n; }

    public BigDecimal getLatitud()         { return latitud; }
    public void setLatitud(BigDecimal lat) { this.latitud = lat; }

    public BigDecimal getLongitud()        { return longitud; }
    public void setLongitud(BigDecimal lng){ this.longitud = lng; }

    public String getDispositivo()             { return dispositivo; }
    public void setDispositivo(String disp)    { this.dispositivo = disp; }
}

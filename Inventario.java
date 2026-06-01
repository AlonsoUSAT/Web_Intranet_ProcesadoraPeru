package com.procesadoraperu.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "inventario")
public class Inventario {

    @Id
    @Column(name = "idInventario")
    private Long idInventario;

    @Column(name = "id_cliente") // O el nombre exacto de la FK en el .vpp
    private Long idCliente;

    @Column(name = "producto")
    private String producto;

    // Estos campos los llena la API Oficial de Procesadora Perú
    @Column(name = "fechaCreacion")
    private LocalDateTime fechaCreacion;

    @Column(name = "latitud", precision = 10, scale = 7)
    private BigDecimal latitud;

    @Column(name = "longitud", precision = 10, scale = 7)
    private BigDecimal longitud;

    // Getters y Setters
    public Long getIdInventario() { return idInventario; }
    public Long getIdCliente() { return idCliente; }
    public String getProducto() { return producto; }
    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public BigDecimal getLatitud() { return latitud; }
    public BigDecimal getLongitud() { return longitud; }
}
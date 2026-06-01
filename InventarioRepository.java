package com.procesadoraperu.repository;

import com.procesadoraperu.model.Inventario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface InventarioRepository extends JpaRepository<Inventario, Long> {

    // Extrae TODAS las coordenadas registradas HOY para el cálculo de Zonas (DBSCAN)
    @Query("SELECT i FROM Inventario i WHERE i.latitud IS NOT NULL AND i.fechaCreacion >= :inicioDia")
    List<Inventario> buscarRutasDelDia(@Param("inicioDia") LocalDateTime inicioDia);
}
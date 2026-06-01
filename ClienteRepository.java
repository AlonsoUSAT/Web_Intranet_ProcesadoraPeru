package com.procesadoraperu.repository;

import com.procesadoraperu.model.Cliente;
import com.procesadoraperu.model.OperarioDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio JPA para la entidad Cliente.
 */
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    /**
     * Obtiene todos los operarios que tienen una transacción de inventario registrada.
     * * CORRECCIÓN APLICADA: 
     * 1. JOIN usa 'i.idCliente' coincidiendo con la entidad Inventario.
     * 2. Se extrae 'i.latitud' e 'i.longitud' para obtener el GPS real de la transacción.
     * 3. INNER JOIN asegura que solo traemos operarios con actividad reciente.
     */
    @Query("""
        SELECT new com.procesadoraperu.model.OperarioDTO(
            c.idCliente,
            c.nombres,
            i.latitud,
            i.longitud,
            c.dispositivo,
            i.producto
        )
        FROM Cliente c
        INNER JOIN Inventario i ON i.idCliente = c.idCliente
        WHERE i.latitud IS NOT NULL
          AND i.longitud IS NOT NULL
        """)
    List<OperarioDTO> buscarOperariosConProducto();

    /**
     * Obtiene las coordenadas históricas para procesamiento DBSCAN.
     * Retorna solo clientes con GPS registrado.
     */
    @Query("SELECT c FROM Cliente c WHERE c.latitud IS NOT NULL AND c.longitud IS NOT NULL")
    List<Cliente> buscarTodosConGPS();
}
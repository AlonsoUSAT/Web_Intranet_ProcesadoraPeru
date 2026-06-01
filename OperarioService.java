package com.procesadoraperu.service;

import com.procesadoraperu.model.Inventario;
import com.procesadoraperu.model.OperarioDTO;
import com.procesadoraperu.model.ZonaAcopioDTO;
import com.procesadoraperu.repository.ClienteRepository;
import com.procesadoraperu.repository.InventarioRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OperarioService {

    private final ClienteRepository clienteRepository;
    private final InventarioRepository inventarioRepository;
    private final DbscanService dbscanService;

    // Inyectamos el InventarioRepository para poder leer las transacciones oficiales
    public OperarioService(ClienteRepository clienteRepository,
                           InventarioRepository inventarioRepository,
                           DbscanService dbscanService) {
        this.clienteRepository = clienteRepository;
        this.inventarioRepository = inventarioRepository;
        this.dbscanService = dbscanService;
    }


    public List<OperarioDTO> obtenerOperariosActivos() {
        return clienteRepository.buscarOperariosConProducto();
    }

    public List<ZonaAcopioDTO> obtenerZonasAcopio() {
        LocalDateTime inicioDia = LocalDate.now().atStartOfDay();
        
        List<Inventario> rutasDelDia = inventarioRepository.buscarRutasDelDia(inicioDia);
        
        return dbscanService.detectarZonas(rutasDelDia);
    }
}
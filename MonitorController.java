package com.procesadoraperu.controller;

import com.procesadoraperu.model.OperarioDTO;
import com.procesadoraperu.model.ZonaAcopioDTO;
import com.procesadoraperu.service.OperarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Permite a tu HTML local consumir los datos
public class MonitorController {

    private final OperarioService operarioService;

    public MonitorController(OperarioService operarioService) {
        this.operarioService = operarioService;
    }

    // El frontend sigue consumiendo este endpoint cada 15 segundos
    @GetMapping("/operarios")
    public ResponseEntity<List<OperarioDTO>> obtenerOperarios() {
        return ResponseEntity.ok(operarioService.obtenerOperariosActivos());
    }

    // El frontend actualiza las zonas DBSCAN leyendo el historial de inventarios
    @GetMapping("/zonas")
    public ResponseEntity<List<ZonaAcopioDTO>> obtenerZonas() {
        return ResponseEntity.ok(operarioService.obtenerZonasAcopio());
    }
}
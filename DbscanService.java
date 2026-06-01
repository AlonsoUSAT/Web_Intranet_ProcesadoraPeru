package com.procesadoraperu.service;

import com.procesadoraperu.model.Cliente;
import com.procesadoraperu.model.ZonaAcopioDTO;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DbscanService {

    /** Radio de búsqueda en metros */
    private static final double EPSILON_METROS = 50.0;

    /** Mínimo de puntos para formar un clúster */
    private static final int MIN_POINTS = 3;

    /** Radio de la Tierra en metros (modelo esférico WGS-84 simplificado) */
    private static final double RADIO_TIERRA_METROS = 6_371_000.0;

    // ── Estados internos de cada punto ───────────────
    private static final int NO_VISITADO = 0;
    private static final int RUIDO       = -1;

    // Cambiar List<Cliente> por List<Inventario>
    public List<ZonaAcopioDTO> detectarZonas(List<Inventario> transaccionesDelDia) {
        List<ZonaAcopioDTO> zonas = new ArrayList<>();
        if (transaccionesDelDia == null || transaccionesDelDia.isEmpty()) return zonas;

        boolean[] visitado = new boolean[transaccionesDelDia.size()];

        for (int i = 0; i < transaccionesDelDia.size(); i++) {
            if (visitado[i]) continue;
            visitado[i] = true;

            List<Integer> vecinos = obtenerVecinos(transaccionesDelDia, i);

            if (vecinos.size() >= MIN_POINTS) {
                // Lógica de clúster existente... (mantén tu código matemático aquí)
            }
        }
        return zonas;
    }

    // Modificar obtenerVecinos para leer lat/lon y fechaCreacion de Inventario
    private List<Integer> obtenerVecinos(List<Inventario> puntos, int idx) {
        List<Integer> vecinos = new ArrayList<>();
        Inventario origen = puntos.get(idx);

        for (int i = 0; i < puntos.size(); i++) {
            if (i == idx) continue;
            Inventario destino = puntos.get(i);

            if (origen.getLatitud() == null || destino.getLatitud() == null) continue;

            double distancia = haversine(
                origen.getLatitud().doubleValue(), origen.getLongitud().doubleValue(),
                destino.getLatitud().doubleValue(), destino.getLongitud().doubleValue()
            );

            long minutosDiferencia = Math.abs(java.time.temporal.ChronoUnit.MINUTES.between(
                origen.getFechaCreacion(), destino.getFechaCreacion()
            ));

            if (distancia <= EPSILON_METROS && minutosDiferencia <= 30) {
                vecinos.add(i);
            }
        }
        return vecinos;
    }

    private List<ZonaAcopioDTO> construirZonasDTO(List<Cliente> puntos,
                                                   int[] cluster,
                                                   int totalClusters) {
        List<ZonaAcopioDTO> zonas = new ArrayList<>();

        for (int cId = 1; cId <= totalClusters; cId++) {
            List<double[]> coordsCluster = new ArrayList<>();

            for (int i = 0; i < puntos.size(); i++) {
                if (cluster[i] == cId) {
                    coordsCluster.add(new double[]{
                        puntos.get(i).getLatitud().doubleValue(),
                        puntos.get(i).getLongitud().doubleValue()
                    });
                }
            }

            if (coordsCluster.isEmpty()) continue;

            // Centroide = promedio de latitudes y longitudes
            double sumLat = 0, sumLng = 0;
            for (double[] coord : coordsCluster) {
                sumLat += coord[0];
                sumLng += coord[1];
            }
            double centLat = sumLat / coordsCluster.size();
            double centLng = sumLng / coordsCluster.size();

            // Radio = máxima distancia desde el centroide a cualquier punto
            double radio = 0;
            for (double[] coord : coordsCluster) {
                double dist = haversine(centLat, centLng, coord[0], coord[1]);
                if (dist > radio) radio = dist;
            }

            // Radio mínimo garantizado de EPSILON para visibilidad en el mapa
            radio = Math.max(radio, EPSILON_METROS);

            zonas.add(new ZonaAcopioDTO(centLat, centLng, radio));
        }

        return zonas;
    }

    /**
     * Calcula la distancia en metros entre dos puntos geográficos
     * usando la fórmula de Haversine (adecuada para distancias cortas).
     *
     * @param lat1 Latitud del punto 1 (grados decimales)
     * @param lng1 Longitud del punto 1 (grados decimales)
     * @param lat2 Latitud del punto 2 (grados decimales)
     * @param lng2 Longitud del punto 2 (grados decimales)
     * @return Distancia en metros
     */
    public static double haversine(double lat1, double lng1, double lat2, double lng2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLng = Math.toRadians(lng2 - lng1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                 + Math.cos(Math.toRadians(lat1))
                 * Math.cos(Math.toRadians(lat2))
                 * Math.sin(dLng / 2) * Math.sin(dLng / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return RADIO_TIERRA_METROS * c;
    }
}

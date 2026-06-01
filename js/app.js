/**
 * ═══════════════════════════════════════════════════════════════
 *  PROCESADORA PERÚ S.A.C. — Monitor GIS
 *  app.js — Lógica principal del dashboard
 *
 *  Módulos:
 *    1. Configuración global
 *    2. Inicialización del mapa Leaflet
 *    3. Gestión de marcadores de operarios
 *    4. Gestión de zonas DBSCAN
 *    5. Panel flotante (lista operarios y zonas)
 *    6. Polling automático (15 segundos)
 *    7. Sidebar y UI general
 *    8. Utilidades
 * ═══════════════════════════════════════════════════════════════
 */

'use strict';

// ═══════════════════════════════════════════════════
// 1. CONFIGURACIÓN GLOBAL
// ═══════════════════════════════════════════════════

const CONFIG = {
  /** URL base del backend Spring Boot (cambiar IP según red local) */
  API_BASE: 'http://192.168.1.100:8080/api',

  /** Endpoints REST */
  ENDPOINTS: {
    operarios: '/operarios',
    zonas:     '/zonas',
  },

  /** Intervalo de polling en milisegundos */
  INTERVALO_POLLING: 15_000,

  /** Centro inicial del mapa: Lambayeque, Perú */
  MAPA_CENTRO: [-6.7011, -79.9069],
  MAPA_ZOOM:   13,

  /** Opciones del círculo de zona DBSCAN */
  ZONA_CIRCULO: {
    color:       '#e3b341',
    fillColor:   '#e3b341',
    fillOpacity: 0.12,
    weight:      2,
    dashArray:   '6 4',
  },
};

// ═══════════════════════════════════════════════════
// 2. INICIALIZACIÓN DEL MAPA LEAFLET
// ═══════════════════════════════════════════════════

// Verificar que hay sesión activa, si no redirigir al login
// const accessToken = sessionStorage.getItem('accessToken');
// if (!accessToken) {
//   window.location.href = '/templates/loginIntranet.html';
// }

// Recuperar datos de sesión
const username = sessionStorage.getItem('username');
const refreshToken = sessionStorage.getItem('refreshToken');

/**
 * Instancia del mapa Leaflet (se llena en iniciarMapa).
 * Los assets del marcador están en assets/leaflet/images/
 */
let mapa = null;

/**
 * Configura el path de los íconos de Leaflet para que resuelva
 * los marcadores desde la carpeta local (requisito de intranet).
 */
// ESTO (lo nuevo) — usa CDN en vez de archivos locales:
function configurarIconosLeaflet() {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}
/** Ícono verde personalizado para operarios activos */
function crearIconoOperario() {
  return L.icon({
    iconUrl:      'assets/leaflet/images/marker-icon.png',
    iconRetinaUrl:'assets/leaflet/images/marker-icon-2x.png',
    shadowUrl:    'assets/leaflet/images/marker-shadow.png',
    iconSize:     [25, 41],
    iconAnchor:   [12, 41],
    popupAnchor:  [1, -34],
    shadowSize:   [41, 41],
    className:    'icono-operario',  // CSS puede aplicar filtros de color
  });
}

/** Inicializa el mapa con tiles OpenStreetMap */
function iniciarMapa() {
  configurarIconosLeaflet();

  mapa = L.map('mapa', {
    center:       CONFIG.MAPA_CENTRO,
    zoom:         CONFIG.MAPA_ZOOM,
    zoomControl:  true,
    preferCanvas: true,  // Mejor rendimiento con muchos marcadores
  });

  // Capa base: OpenStreetMap (disponible offline si hay caché)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom:     19,
  }).addTo(mapa);

  // Botón personalizado de centrado
  document.getElementById('btnCentrar').addEventListener('click', () => {
    mapa.setView(CONFIG.MAPA_CENTRO, CONFIG.MAPA_ZOOM);
  });
}

// ═══════════════════════════════════════════════════
// 3. GESTIÓN DE MARCADORES DE OPERARIOS
// ═══════════════════════════════════════════════════

/**
 * Mapa de marcadores activos.
 * Clave: idCliente (number)
 * Valor: instancia L.Marker
 */
const marcadoresOperarios = new Map();

/**
 * Actualiza los marcadores en el mapa con los datos recibidos.
 * Reutiliza el marcador si ya existe; crea uno nuevo si no.
 * Elimina marcadores de operarios que ya no están en la respuesta.
 *
 * @param {Array} operarios - Lista de objetos operario del backend
 */
function actualizarMarcadoresOperarios(operarios) {
  const idsActuales = new Set(operarios.map(op => op.idCliente));

  // Eliminar marcadores que ya no están
  for (const [id, marcador] of marcadoresOperarios) {
    if (!idsActuales.has(id)) {
      mapa.removeLayer(marcador);
      marcadoresOperarios.delete(id);
    }
  }

  // Crear o mover marcadores
  operarios.forEach(operario => {
    const { idCliente, latitud, longitud } = operario;

    if (!latitud || !longitud) return; // Ignorar sin coordenadas

    const posicion = [parseFloat(latitud), parseFloat(longitud)];

    if (marcadoresOperarios.has(idCliente)) {
      // Mover marcador existente suavemente
      marcadoresOperarios.get(idCliente).setLatLng(posicion);
    } else {
      // Crear nuevo marcador
      const marcador = L.marker(posicion, { icon: crearIconoOperario() })
        .addTo(mapa)
        .bindPopup(construirPopupOperario(operario), { maxWidth: 260 });

      // Al hacer clic en el pin → centrar mapa y enfocar en panel
      marcador.on('click', () => {
        destacarOperarioEnPanel(idCliente);
      });

      marcadoresOperarios.set(idCliente, marcador);
    }

    // Actualizar contenido del popup (datos pueden cambiar entre polls)
    marcadoresOperarios.get(idCliente).setPopupContent(construirPopupOperario(operario));
  });
}

/**
 * Construye el HTML del popup de un operario.
 * @param {Object} operario
 * @returns {string} HTML del popup
 */
function construirPopupOperario(operario) {
  const { nombres, dispositivo, latitud, longitud, producto } = operario;

  return `
    <div class="popup-operario">
      <div class="popup-nombre">👷 ${escaparHTML(nombres || 'Sin nombre')}</div>
      <div class="popup-fila">
        <span class="popup-clave">Producto</span>
        <span class="popup-valor">${escaparHTML(producto || '—')}</span>
      </div>
      <div class="popup-fila">
        <span class="popup-clave">Dispositivo</span>
        <span class="popup-valor">${escaparHTML(dispositivo || '—')}</span>
      </div>
      <div class="popup-fila">
        <span class="popup-clave">Lat / Lng</span>
        <span class="popup-valor">${parseFloat(latitud).toFixed(5)}, ${parseFloat(longitud).toFixed(5)}</span>
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════
// 4. GESTIÓN DE ZONAS DBSCAN
// ═══════════════════════════════════════════════════

/**
 * Mapa de círculos de zonas DBSCAN activos.
 * Clave: índice de zona (number)
 * Valor: instancia L.Circle
 */
const circulosZonas = new Map();

/**
 * Actualiza los círculos de zonas DBSCAN en el mapa.
 * Payload esperado del backend:
 * [{ latitudCentral, longitudCentral, radioMetros }, ...]
 *
 * @param {Array} zonas - Lista de zonas del endpoint /api/zonas
 */
function actualizarZonasDBSCAN(zonas) {
  // Eliminar círculos anteriores
  for (const circulo of circulosZonas.values()) {
    mapa.removeLayer(circulo);
  }
  circulosZonas.clear();

  zonas.forEach((zona, indice) => {
    const { latitudCentral, longitudCentral, radioMetros } = zona;

    if (!latitudCentral || !longitudCentral) return;

    const circulo = L.circle(
      [parseFloat(latitudCentral), parseFloat(longitudCentral)],
      {
        ...CONFIG.ZONA_CIRCULO,
        radius: parseFloat(radioMetros) || 50,
      }
    ).addTo(mapa);

    circulo.bindPopup(construirPopupZona(zona, indice + 1), { maxWidth: 240 });

    circulosZonas.set(indice, circulo);
  });

  actualizarListaZonas(zonas);
}

/**
 * Construye el HTML del popup de una zona DBSCAN.
 */
function construirPopupZona(zona, numero) {
  const { latitudCentral, longitudCentral, radioMetros } = zona;
  return `
    <div class="popup-zona">
      <div class="popup-zona-titulo">📦 Zona de Acopio #${numero}</div>
      <div class="popup-fila">
        <span class="popup-clave">Centro</span>
        <span class="popup-valor">${parseFloat(latitudCentral).toFixed(5)}, ${parseFloat(longitudCentral).toFixed(5)}</span>
      </div>
      <div class="popup-fila">
        <span class="popup-clave">Radio</span>
        <span class="popup-valor">${Math.round(radioMetros)} m</span>
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════
// 5. PANEL FLOTANTE — LISTA DE OPERARIOS Y ZONAS
// ═══════════════════════════════════════════════════

/** Datos de operarios en memoria para el filtro */
let todosLosOperarios = [];

/**
 * Renderiza la lista de operarios en el panel flotante.
 * @param {Array} operarios
 */
function actualizarListaOperarios(operarios) {
  todosLosOperarios = operarios;

  const termino = document.getElementById('filtroOperario').value.toLowerCase();
  const filtrados = termino
    ? operarios.filter(op => (op.nombres || '').toLowerCase().includes(termino))
    : operarios;

  renderizarItemsOperarios(filtrados);

  // Actualizar contador
  document.getElementById('contadorOperarios').textContent = operarios.length;
}

/**
 * Renderiza los `<li>` de operarios en la lista.
 */
function renderizarItemsOperarios(operarios) {
  const lista = document.getElementById('listaOperarios');
  lista.innerHTML = '';

  if (operarios.length === 0) {
    lista.innerHTML = '<li class="operario-vacio">No se encontraron operarios</li>';
    return;
  }

  operarios.forEach(operario => {
    const { idCliente, nombres, producto, dispositivo } = operario;
    const iniciales = obtenerIniciales(nombres);

    const li = document.createElement('li');
    li.className = 'operario-item';
    li.dataset.id = idCliente;
    li.innerHTML = `
      <div class="operario-avatar">${iniciales}</div>
      <div class="operario-info">
        <span class="operario-nombre">${escaparHTML(nombres || 'Sin nombre')}</span>
        <span class="operario-meta">${escaparHTML(producto || '—')} · ${escaparHTML(dispositivo || '—')}</span>
      </div>
    `;

    // Al hacer clic en la lista → abrir popup del marcador en el mapa
    li.addEventListener('click', () => {
      const marcador = marcadoresOperarios.get(idCliente);
      if (marcador) {
        mapa.setView(marcador.getLatLng(), 16, { animate: true });
        marcador.openPopup();
      }
    });

    lista.appendChild(li);
  });
}

/**
 * Resalta visualmente un operario en el panel (al hacer clic en su pin).
 */
function destacarOperarioEnPanel(idCliente) {
  const items = document.querySelectorAll('.operario-item');
  items.forEach(item => item.classList.remove('activo'));

  const itemObjetivo = document.querySelector(`.operario-item[data-id="${idCliente}"]`);
  if (itemObjetivo) {
    itemObjetivo.classList.add('activo');
    itemObjetivo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * Renderiza la lista de zonas DBSCAN en el panel.
 */
function actualizarListaZonas(zonas) {
  const lista = document.getElementById('listaZonas');
  lista.innerHTML = '';

  if (!zonas || zonas.length === 0) {
    lista.innerHTML = '<li class="zona-vacia">Sin zonas detectadas aún</li>';
    return;
  }

  zonas.forEach((zona, indice) => {
    const { latitudCentral, longitudCentral, radioMetros } = zona;
    const li = document.createElement('li');
    li.className = 'zona-item';
    li.innerHTML = `
      <span class="zona-icono">📦</span>
      <div class="zona-info">
        <span class="zona-nombre">Zona de Acopio #${indice + 1}</span>
        <span class="zona-coords">${parseFloat(latitudCentral).toFixed(4)}, ${parseFloat(longitudCentral).toFixed(4)} · ${Math.round(radioMetros)}m</span>
      </div>
    `;

    // Al hacer clic → centrar mapa en la zona
    li.addEventListener('click', () => {
      const circulo = circulosZonas.get(indice);
      if (circulo) {
        mapa.setView([parseFloat(latitudCentral), parseFloat(longitudCentral)], 16, { animate: true });
        circulo.openPopup();
      }
    });

    lista.appendChild(li);
  });
}

// ═══════════════════════════════════════════════════
// 6. POLLING AUTOMÁTICO
// ═══════════════════════════════════════════════════

let idIntervalo        = null;
let cuentaRegresivaVal = 15;
let idCuentaRegresiva  = null;

/**
 * Obtiene los datos de operarios y zonas del backend.
 * Se llama inmediatamente y luego cada 15 segundos.
 */
async function obtenerDatos() {
  try {
    // Llamadas en paralelo para eficiencia
    const [resOperarios, resZonas] = await Promise.all([
      fetch(`${CONFIG.API_BASE}${CONFIG.ENDPOINTS.operarios}`),
      fetch(`${CONFIG.API_BASE}${CONFIG.ENDPOINTS.zonas}`),
    ]);

    if (!resOperarios.ok) throw new Error(`Error operarios: ${resOperarios.status}`);
    if (!resZonas.ok)     throw new Error(`Error zonas: ${resZonas.status}`);

    const operarios = await resOperarios.json();
    const zonas     = await resZonas.json();

    // Actualizar mapa
    actualizarMarcadoresOperarios(operarios);
    actualizarZonasDBSCAN(zonas);

    // Actualizar panel
    actualizarListaOperarios(operarios);

    // Indicador visual de conexión exitosa
    setEstadoConexion('conectado', `${operarios.length} operario${operarios.length !== 1 ? 's' : ''} activo${operarios.length !== 1 ? 's' : ''}`);

  } catch (error) {
    console.error('[Monitor GIS] Error al obtener datos:', error);
    setEstadoConexion('error', 'Sin conexión al servidor');
    mostrarToast('No se pudo conectar al backend. Reintentando...', 'error');
  }
}

/** Inicia el ciclo de polling de 15 segundos */
function iniciarPolling() {
  // Primera llamada inmediata
  obtenerDatos();

  // Iniciar cuenta regresiva visual
  iniciarCuentaRegresiva();

  // Polling cada 15 segundos
  idIntervalo = setInterval(() => {
    obtenerDatos();
    reiniciarCuentaRegresiva();
  }, CONFIG.INTERVALO_POLLING);
}

function iniciarCuentaRegresiva() {
  cuentaRegresivaVal = 15;
  actualizarTextoCuenta();

  idCuentaRegresiva = setInterval(() => {
    cuentaRegresivaVal--;
    if (cuentaRegresivaVal < 0) cuentaRegresivaVal = 15;
    actualizarTextoCuenta();
  }, 1000);
}

function reiniciarCuentaRegresiva() {
  cuentaRegresivaVal = 15;
  actualizarTextoCuenta();

  // Reiniciar animación CSS de la barra
  const barra = document.getElementById('refrescoBarra');
  barra.style.animation = 'none';
  barra.offsetHeight; // reflow
  barra.style.animation = '';
}

function actualizarTextoCuenta() {
  const el = document.getElementById('cuentaRegresiva');
  if (el) el.textContent = cuentaRegresivaVal;
}

// ═══════════════════════════════════════════════════
// 7. SIDEBAR Y UI GENERAL
// ═══════════════════════════════════════════════════

function iniciarUI() {
  // Toggle del sidebar
  const sidebar   = document.getElementById('sidebar');
  const btnToggle = document.getElementById('btnToggleSidebar');

  btnToggle.addEventListener('click', () => {
    sidebar.classList.toggle('colapsado');
  });

  // Navegación del sidebar (visual únicamente, extensible)
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('activo'));
      item.classList.add('activo');
    });
  });

  // Filtro de operarios
  document.getElementById('filtroOperario').addEventListener('input', () => {
    actualizarListaOperarios(todosLosOperarios);
  });

  // Botón refrescar manual
  document.getElementById('btnRefrescar').addEventListener('click', () => {
    obtenerDatos();
    reiniciarCuentaRegresiva();
    mostrarToast('Actualizando datos...', 'info');
  });

  // Fecha en topbar
  actualizarFechaTopbar();
  setInterval(actualizarFechaTopbar, 60_000);
}

function actualizarFechaTopbar() {
  const el = document.getElementById('topbarFecha');
  if (!el) return;

  const ahora = new Date();
  const opciones = {
    weekday: 'long',
    year:    'numeric',
    month:   'long',
    day:     'numeric',
    hour:    '2-digit',
    minute:  '2-digit',
    timeZone: 'America/Lima',
  };
  el.textContent = ahora.toLocaleDateString('es-PE', opciones);
}

/** Actualiza el indicador de conexión en el sidebar */
function setEstadoConexion(estado, texto) {
  const dot    = document.getElementById('estadoDot');
  const textoEl= document.getElementById('estadoTexto');

  dot.className   = `estado-dot ${estado}`;
  textoEl.textContent = texto;
}

// ═══════════════════════════════════════════════════
// 8. UTILIDADES
// ═══════════════════════════════════════════════════

/**
 * Escapa caracteres HTML para evitar XSS al insertar texto del servidor.
 */
function escaparHTML(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(String(str)));
  return div.innerHTML;
}

/**
 * Obtiene las iniciales de un nombre (máximo 2 caracteres).
 */
function obtenerIniciales(nombre) {
  if (!nombre) return '??';
  const partes = nombre.trim().split(/\s+/);
  if (partes.length === 1) return partes[0].substring(0, 2).toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

/**
 * Muestra un toast de notificación temporal.
 * @param {string} mensaje
 * @param {'exito'|'error'|'info'} tipo
 * @param {number} duracion ms
 */
function mostrarToast(mensaje, tipo = 'info', duracion = 3000) {
  let contenedor = document.querySelector('.toast-contenedor');
  if (!contenedor) {
    contenedor = document.createElement('div');
    contenedor.className = 'toast-contenedor';
    document.body.appendChild(contenedor);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${tipo}`;
  toast.textContent = mensaje;
  contenedor.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity    = '0';
    toast.style.transform  = 'translateX(20px)';
    setTimeout(() => toast.remove(), 300);
  }, duracion);
}

// ═══════════════════════════════════════════════════
// PUNTO DE ENTRADA
// ═══════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  iniciarUI();
  iniciarMapa();
  iniciarPolling();
});

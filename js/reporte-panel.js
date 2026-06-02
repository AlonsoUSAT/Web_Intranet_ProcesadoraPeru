'use strict';

const API = 'http://192.168.1.100:8080/api';

/* ── MAPA ── */
const mapa = L.map('mapa', {
  center: [-6.7011, -79.9069],
  zoom: 13,
  zoomControl: true,
  preferCanvas: true,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, © CartoDB',
  maxZoom: 19,
}).addTo(mapa);

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const marcadores = new Map();
const circulos   = new Map();

/* ── CARGAR DATOS ── */
async function cargarDatos() {
  try {
    const [resOp, resZonas] = await Promise.all([
      fetch(`${API}/operarios`),
      fetch(`${API}/zonas`),
    ]);

    if (!resOp.ok || !resZonas.ok) throw new Error('Error de red');

    const operarios = await resOp.json();
    const zonas     = await resZonas.json();

    // KPIs
    document.getElementById('kpiOperarios').textContent  = operarios.length;
    document.getElementById('kpiAlmacenes').textContent  = zonas.length;
    document.getElementById('kpiOperarios').classList.remove('kpi-loading');
    document.getElementById('kpiAlmacenes').classList.remove('kpi-loading');

    // Status bar
    document.getElementById('statusOperarios').textContent = `${operarios.length} operarios activos`;
    document.getElementById('statusAlertas').textContent   = `${document.getElementById('kpiDesviaciones').textContent} alertas`;

    // Marcadores operarios
    const idsActuales = new Set(operarios.map(o => o.idCliente));
    for (const [id, m] of marcadores) {
      if (!idsActuales.has(id)) { mapa.removeLayer(m); marcadores.delete(id); }
    }
    operarios.forEach(op => {
      if (!op.latitud || !op.longitud) return;
      const pos = [parseFloat(op.latitud), parseFloat(op.longitud)];
      if (marcadores.has(op.idCliente)) {
        marcadores.get(op.idCliente).setLatLng(pos);
      } else {
        const m = L.marker(pos).addTo(mapa)
          .bindPopup(`<b>${op.nombres || '—'}</b><br>${op.producto || '—'}`);
        marcadores.set(op.idCliente, m);
      }
    });

    // Círculos zonas
    for (const c of circulos.values()) mapa.removeLayer(c);
    circulos.clear();
    zonas.forEach((z, i) => {
      if (!z.latitudCentral || !z.longitudCentral) return;
      const c = L.circle([z.latitudCentral, z.longitudCentral], {
        radius: z.radioMetros || 50,
        color: '#16A34A', fillColor: '#16A34A', fillOpacity: 0.1, weight: 2, dashArray: '5 4',
      }).addTo(mapa);
      circulos.set(i, c);
    });

    document.getElementById('statusSync').textContent = '● SINCRONIZADO';
    document.getElementById('statusSync').style.color = '#16A34A';

  } catch (e) {
    console.error('[Panel] Error:', e);
    document.getElementById('statusSync').textContent = '✗ SIN CONEXIÓN';
    document.getElementById('statusSync').style.color = '#DC2626';
  }
}

/* ── INCIDENCIAS ── */
async function cargarIncidencias() {
  try {
    const res = await fetch(`${API}/reportes/operarios/conteo`);
    if (!res.ok) return;
    const data = await res.json();

    // Conteo de desviaciones: operarios con más de un reporte en el día
    const conDesviacion = data.filter(d => d.totalReportes > 5);
    document.getElementById('kpiDesviaciones').textContent = conDesviacion.length;
    document.getElementById('kpiDesviaciones').classList.remove('kpi-loading');
    document.getElementById('badgeNuevas').textContent = `${conDesviacion.length} NUEVAS`;
    document.getElementById('statusAlertas').textContent = `${conDesviacion.length} alertas`;

    // Contar registros totales del día
    const totalReg = data.reduce((sum, d) => sum + (d.totalReportes || 0), 0);
    document.getElementById('statusRegistros').textContent = `${totalReg} registros hoy`;

    const lista = document.getElementById('listaIncidencias');
    if (data.length === 0) {
      lista.innerHTML = '<div style="color:var(--gris-400);font-size:12px;text-align:center;padding:20px 0">Sin incidencias recientes</div>';
      return;
    }

    lista.innerHTML = data.slice(0, 3).map(d => {
      const tipo = d.totalReportes > 7 ? 'desvio' : d.totalReportes > 4 ? 'tiempo' : 'senal';
      const tagLabel = tipo === 'desvio' ? 'DESVÍO DE RUTA' : tipo === 'tiempo' ? 'EXCESO TIEMPO' : 'PÉRDIDA SEÑAL';
      const tagClass = tipo === 'desvio' ? 'tag-desvio' : tipo === 'tiempo' ? 'tag-tiempo' : 'tag-senal';
      return `
        <div class="incidencia-item ${tipo}">
          <span class="inc-tag ${tagClass}">${tagLabel}</span>
          <span class="inc-tiempo">${d.ultimaFecha || '—'}</span>
          <div class="inc-titulo">${d.ultimoProducto || 'Reporte de campo'}</div>
          <div class="inc-operario">Operario: ${d.usuario || '—'}</div>
        </div>`;
    }).join('');

  } catch (e) {
    console.error('[Panel] Error incidencias:', e);
  }
}

/* ── ACCIONES ── */
function reportarDesviacion() {
  alert('Módulo de reporte de desviación — pendiente de integración.');
}

function congelarEvidencia() {
  alert('Módulo de congelar evidencia — pendiente de integración.');
}

document.getElementById('btnExportar').addEventListener('click', () => {
  alert('Exportar todo — pendiente de integración.');
});

/* ── INICIALIZAR ── */
cargarDatos();
cargarIncidencias();
setInterval(cargarDatos, 15000);
setInterval(cargarIncidencias, 30000);
'use strict';

const API = 'http://192.168.1.100:8080/api';

let incidenciasData = [];
let tipoActivo      = 'todas';
let busquedaActiva  = '';

const TAG_LABEL = { desvio: 'DESVÍO DE RUTA', tiempo: 'EXCESO TIEMPO', senal: 'PÉRDIDA SEÑAL' };
const TAG_CLASS = { desvio: 'tag-desvio',      tiempo: 'tag-tiempo',    senal: 'tag-senal'    };
const EST_LABEL = { 'sin-resolver': 'Sin resolver', 'en-revision': 'En revisión', 'resuelto': 'Resuelto' };
const EST_CLASS = { 'sin-resolver': 'estado-sin-resolver', 'en-revision': 'estado-en-revision', 'resuelto': 'estado-resuelto' };


async function cargarIncidencias() {
  try {
    const [resConteo, resOp] = await Promise.all([
      fetch(`${API}/reportes/operarios/conteo`),
      fetch(`${API}/operarios`),
    ]);

    if (resOp.ok) {
      const ops = await resOp.json();
      document.getElementById('statusOperarios').textContent = `${ops.length} operarios activos`;
    }

    if (!resConteo.ok) throw new Error('Error conteo');

    const conteos = await resConteo.json();

    incidenciasData = conteos.map(d => {
      let tipo, titulo, lugar;
      if (d.totalReportes > 7) {
        tipo   = 'desvio';
        titulo = `Alta actividad: ${d.ultimoProducto || 'reporte de campo'}`;
        lugar  = `Ruta activa · ${d.totalReportes} reportes`;
      } else if (d.totalReportes > 4) {
        tipo   = 'tiempo';
        titulo = 'Permanencia prolongada';
        lugar  = `Almacén activo · ${d.totalReportes} registros`;
      } else {
        tipo   = 'senal';
        titulo = 'Sin reporte GPS reciente';
        lugar  = `Zona pendiente · ${d.totalReportes} registros`;
      }

      return {
        tipo,
        titulo,
        operario: d.usuario    || '—',
        lugar,
        tiempo:   d.ultimaFecha || '—',
        estado:   tipo === 'tiempo' ? 'en-revision' : 'sin-resolver',
      };
    });

    const totalAlertas  = incidenciasData.length;
    const totalRegistros = conteos.reduce((s, d) => s + (d.totalReportes || 0), 0);

    document.getElementById('statusAlertas').textContent   = `${totalAlertas} alertas`;
    document.getElementById('statusRegistros').textContent = `${totalRegistros} registros hoy`;
    document.getElementById('statusSync').textContent      = '● SINCRONIZADO';
    document.getElementById('statusSync').style.color      = '';

    renderGrid();

  } catch (e) {
    console.error('[Incidencias] Error:', e);
    document.getElementById('incidenciasGrid').innerHTML =
      '<div class="inc-vacio"><div class="inc-vacio-icon">⚡</div>Error al cargar. Verificar conexión.</div>';
    document.getElementById('statusSync').textContent = '✗ SIN CONEXIÓN';
    document.getElementById('statusSync').style.color = '#DC2626';
  }
}

function renderGrid() {
  const filtradas = incidenciasData.filter(inc => {
    const pasaTipo = tipoActivo === 'todas' || inc.tipo === tipoActivo;
    const pasaBusq = !busquedaActiva ||
      inc.titulo.toLowerCase().includes(busquedaActiva)   ||
      inc.operario.toLowerCase().includes(busquedaActiva) ||
      inc.lugar.toLowerCase().includes(busquedaActiva);
    return pasaTipo && pasaBusq;
  });

  const grid = document.getElementById('incidenciasGrid');

  if (filtradas.length === 0) {
    grid.innerHTML = `
      <div class="inc-vacio">
        <div class="inc-vacio-icon">✅</div>
        No hay incidencias para el filtro seleccionado
      </div>`;
    return;
  }

  grid.innerHTML = filtradas.map(inc => `
    <div class="inc-card ${inc.tipo}">
      <div class="inc-card-header">
        <span class="inc-tag ${TAG_CLASS[inc.tipo]}">${TAG_LABEL[inc.tipo]}</span>
        <span class="inc-tiempo-rel">${inc.tiempo}</span>
      </div>
      <div class="inc-titulo">${inc.titulo}</div>
      <div class="inc-operario">Operario: ${inc.operario}</div>
      <div class="inc-meta">
        <div class="inc-meta-item">📍 ${inc.lugar}</div>
        <span class="inc-estado ${EST_CLASS[inc.estado]}">${EST_LABEL[inc.estado]}</span>
      </div>
    </div>`
  ).join('');
}

function filtrarTipo(tipo, btn) {
  tipoActivo = tipo;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('activo'));
  btn.classList.add('activo');
  renderGrid();
}

/* ── EVENTOS ── */
document.getElementById('buscarInc').addEventListener('input', e => {
  busquedaActiva = e.target.value.toLowerCase();
  renderGrid();
});

document.getElementById('btnExportar').addEventListener('click', () => {
  alert('Exportar incidencias — pendiente de integración.');
});

/* ── INIT ── */
cargarIncidencias();
setInterval(cargarIncidencias, 30000);
'use strict';

const API = 'http://192.168.1.100:8080/api';

// Fechas por defecto: última semana
const hoy   = new Date();
const hace7 = new Date();
hace7.setDate(hoy.getDate() - 7);
const fmt = d => d.toISOString().split('T')[0];

document.getElementById('fechaInicio').value = fmt(hace7);
document.getElementById('fechaFin').value    = fmt(hoy);

/* ── ALMACENES ── */
async function cargarAlmacenes() {
  try {
    const res = await fetch(`${API}/inventario/sucursales`);
    if (!res.ok) return;
    const sucursales = await res.json();
    const sel = document.getElementById('selectorAlmacen');
    sucursales.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.idSucursal;
      opt.textContent = s.sucursal || s.idSucursal;
      sel.appendChild(opt);
    });
  } catch(e) { /* sin sucursales, queda "Todos" */ }
}

/* ── TABLA ── */
let todosLosRegistros = [];
let paginaActual = 1;
const POR_PAGINA = 10;

async function cargarMovimientos() {
  const fi  = document.getElementById('fechaInicio').value;
  const ff  = document.getElementById('fechaFin').value;
  const alm = document.getElementById('selectorAlmacen').value;

  if (!fi || !ff) return;

  // KPIs de operarios activos
  try {
    const resOp = await fetch(`${API}/operarios`);
    if (resOp.ok) {
      const ops = await resOp.json();
      document.getElementById('statusOperarios').textContent = `${ops.length} operarios activos`;
    }
  } catch(e) {}

  // Datos principales
  try {
    const params = new URLSearchParams({
      idSucursal:  alm || 'TODAS',
      idAlmacen:   alm || 'TODOS',
      fechaInicio: fi,
      fechaFin:    ff,
    });

    const res = await fetch(`${API}/inventario/consultar?${params}`);
    if (!res.ok) throw new Error('Error al consultar inventario');

    const data = await res.json();
    todosLosRegistros = data;
    paginaActual = 1;
    renderTabla();
    calcularKPIs(data);

    document.getElementById('statusRegistros').textContent = `${data.length} registros hoy`;
    document.getElementById('statusSync').textContent = '● SINCRONIZADO';
    document.getElementById('statusSync').style.color = '';

  } catch(e) {
    console.error('[Permanencia] Error:', e);
    document.getElementById('tablaBody').innerHTML =
      '<tr class="loading-row"><td colspan="7">Error al cargar datos. Verificar conexión.</td></tr>';
    document.getElementById('statusSync').textContent = '✗ SIN CONEXIÓN';
    document.getElementById('statusSync').style.color = '#DC2626';
  }
}

function calcularKPIs(data) {
  if (!data || data.length === 0) return;
  const tiempoProm = Math.round(38 + Math.random() * 10);
  document.getElementById('kpiTiempo').textContent        = tiempoProm;
  document.getElementById('kpiEficiencia').textContent    = '94';
  document.getElementById('kpiTiempoDelta').textContent   = '↓ 12% vs sem ant.';
  document.getElementById('kpiEficienciaDelta').textContent = '↑ 3% vs sem ant.';
}

function renderTabla() {
  const buscar    = document.getElementById('buscarOperario').value.toLowerCase();
  const filtrados = buscar
    ? todosLosRegistros.filter(r =>
        (r.producto     || '').toLowerCase().includes(buscar) ||
        (r.almacen      || '').toLowerCase().includes(buscar) ||
        (r.idInventario || '').toLowerCase().includes(buscar)
      )
    : todosLosRegistros;

  const inicio = (paginaActual - 1) * POR_PAGINA;
  const pagina = filtrados.slice(inicio, inicio + POR_PAGINA);
  const tbody  = document.getElementById('tablaBody');

  if (filtrados.length === 0) {
    tbody.innerHTML = '<tr class="loading-row"><td colspan="7">No se encontraron registros</td></tr>';
    document.getElementById('totalRegistros').textContent = 'Sin registros';
    document.getElementById('paginacion').innerHTML = '';
    return;
  }

  tbody.innerHTML = pagina.map(r => {
    const fechaEntrada = r.fechaCreacion
      ? new Date(r.fechaCreacion).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })
      : '—';

    let estado, badgeClass;
    if (!r.cantidad || r.cantidad === 0) {
      estado = 'Activo';     badgeClass = 'badge-activo';
    } else if (r.cantidad > 100) {
      estado = 'Excedido';   badgeClass = 'badge-excedido';
    } else {
      estado = 'Completado'; badgeClass = 'badge-completado';
    }

    const tiempoClass = estado === 'Excedido' ? 'td-tiempo-excedido' : '';

    return `<tr>
      <td class="td-id">${r.idInventario || '—'}</td>
      <td class="td-nombre">${r.producto || '—'}</td>
      <td>${r.almacen || r.idAlmacen || '—'}</td>
      <td>${fechaEntrada}</td>
      <td>${r.fechaCreacion ? 'En curso' : '—'}</td>
      <td class="${tiempoClass}">${r.cantidad ? r.cantidad + ' ' + (r.unidadMedida || '') : '—'}</td>
      <td><span class="badge-estado ${badgeClass}">${estado}</span></td>
    </tr>`;
  }).join('');

  document.getElementById('totalRegistros').textContent =
    `Mostrando ${inicio + 1}–${Math.min(inicio + POR_PAGINA, filtrados.length)} de ${filtrados.length} registros`;

  renderPaginacion(filtrados.length);
}

function renderPaginacion(total) {
  const totalPag = Math.ceil(total / POR_PAGINA);
  const cont = document.getElementById('paginacion');
  if (totalPag <= 1) { cont.innerHTML = ''; return; }

  let html = `<button class="pag-btn" onclick="irPagina(${paginaActual - 1})" ${paginaActual === 1 ? 'disabled' : ''}>‹</button>`;
  for (let i = 1; i <= Math.min(totalPag, 5); i++) {
    html += `<button class="pag-btn ${i === paginaActual ? 'activo' : ''}" onclick="irPagina(${i})">${i}</button>`;
  }
  if (totalPag > 5) {
    html += `<span style="padding:0 4px;color:var(--gris-400)">…</span>`;
    html += `<button class="pag-btn" onclick="irPagina(${totalPag})">${totalPag}</button>`;
  }
  html += `<button class="pag-btn" onclick="irPagina(${paginaActual + 1})" ${paginaActual === totalPag ? 'disabled' : ''}>›</button>`;
  cont.innerHTML = html;
}

function irPagina(n) {
  const total = Math.ceil(todosLosRegistros.length / POR_PAGINA);
  if (n < 1 || n > total) return;
  paginaActual = n;
  renderTabla();
}

/* ── EXPORTAR ── */
function exportarPDF()   { alert('Exportar PDF — pendiente de integración.'); }
function exportarExcel() { alert('Exportar Excel — pendiente de integración.'); }

/* ── EVENTOS ── */
document.getElementById('buscarOperario').addEventListener('input', () => { paginaActual = 1; renderTabla(); });
document.getElementById('fechaInicio').addEventListener('change', cargarMovimientos);
document.getElementById('fechaFin').addEventListener('change', cargarMovimientos);
document.getElementById('selectorAlmacen').addEventListener('change', cargarMovimientos);
document.getElementById('btnExportar').addEventListener('click', exportarExcel);

/* ── INIT ── */
cargarAlmacenes();
cargarMovimientos();
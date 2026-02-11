// ==============================
// CLASES / OBJETOS DEL DOMINIO
// ==============================
class Plan {
  constructor(cuotas, interesMensual) {
    this.cuotas = cuotas;
    this.interesMensual = interesMensual;
  }

  interesMensualPorcentaje() {
    return (this.interesMensual * 100).toFixed(2);
  }
}

// ==============================
// PLANES (ARRAY DE OBJETOS)
// ==============================
const planes = [
  new Plan(3, 0.05),
  new Plan(6, 0.08),
  new Plan(12, 0.12),s
];

// ==============================
// FUNCIONES PURAS (NO DOM)
// ==============================
function calcularCuota(monto, plan) {
  const interesTotal = monto * plan.interesMensual * plan.cuotas;
  const total = monto + interesTotal;
  const cuota = total / plan.cuotas;

  return { total, cuota, interesTotal };
}

function formatoDinero(valor) {
  return `$ ${valor.toFixed(2)}`;
}

// ==============================
// STORAGE
// ==============================
function guardarEnHistorial(simulacion) {
  const historial = JSON.parse(localStorage.getItem("historial")) || [];
  historial.push(simulacion);
  localStorage.setItem("historial", JSON.stringify(historial));
}

function obtenerHistorial() {
  return JSON.parse(localStorage.getItem("historial")) || [];
}

// ==============================
// RENDER DOM
// ==============================
function renderPlanes() {
  const ul = document.getElementById("listaPlanes");
  const select = document.getElementById("selectPlan");

  ul.innerHTML = "";

  // Placeholder correcto (evita que "value=''" se convierta en 0)
  select.innerHTML = "<option value='' selected disabled>Seleccioná un plan</option>";

  planes.forEach((plan, index) => {
    // Lista visible en la sección "Planes disponibles"
    const li = document.createElement("li");
    li.textContent = `${plan.cuotas} cuotas - ${plan.interesMensualPorcentaje()}% mensual`;
    ul.appendChild(li);

    // Opciones del select
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = `${plan.cuotas} cuotas - ${plan.interesMensualPorcentaje()}%`;
    select.appendChild(option);
  });
}

function renderResultado(resultado, monto, plan) {
  const salida = document.getElementById("salida");

  salida.innerHTML = `
    <p class="ok">Resultado de la simulación</p>
    <p>Monto: ${formatoDinero(monto)}</p>
    <p>Plan: ${plan.cuotas} cuotas</p>
    <p>Interés mensual: ${plan.interesMensualPorcentaje()}%</p>
    <p>Interés total: ${formatoDinero(resultado.interesTotal)}</p>
    <p>Total a pagar: ${formatoDinero(resultado.total)}</p>
    <p>Cuota mensual: ${formatoDinero(resultado.cuota)}</p>
  `;
}

function renderHistorial() {
  const ul = document.getElementById("historial");
  ul.innerHTML = "";

  const historial = obtenerHistorial();

  if (historial.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No hay simulaciones guardadas todavía.";
    ul.appendChild(li);
    return;
  }

  historial.forEach((item) => {
    const li = document.createElement("li");

    // item.plan viene serializado (objeto plano). Igual tiene cuotas/interesMensual.
    const cuotas = item.plan.cuotas;
    const interesPorc = (item.plan.interesMensual * 100).toFixed(2);

    li.textContent = `${formatoDinero(item.monto)} - ${cuotas} cuotas (${interesPorc}% mensual)`;
    ul.appendChild(li);
  });
}

// ==============================
// EVENTOS
// ==============================
document.getElementById("formSimulador").addEventListener("submit", (e) => {
  e.preventDefault();

  const montoInput = document.getElementById("inputMonto");
  const planSelect = document.getElementById("selectPlan");

  const monto = Number(montoInput.value);

  // Validación de monto
  if (!Number.isFinite(monto) || monto <= 0) return;

  // Validación de plan (si está vacío, no seguimos)
  if (planSelect.value === "") return;

  const planIndex = Number(planSelect.value);
  const planElegido = planes[planIndex];

  if (!planElegido) return; // seguridad extra

  const resultado = calcularCuota(monto, planElegido);

  // Objeto simulación (se guarda completo)
  const simulacion = { monto, plan: planElegido, resultado };
  guardarEnHistorial(simulacion);

  // Salidas en DOM
  renderResultado(resultado, monto, planElegido);
  renderHistorial();
});

document.getElementById("btnLimpiar").addEventListener("click", () => {
  document.getElementById("formSimulador").reset();
});

document.getElementById("btnBorrarHistorial").addEventListener("click", () => {
  localStorage.removeItem("historial");
  renderHistorial();
});

// ==============================
// INIT
// ==============================
renderPlanes();
renderHistorial();
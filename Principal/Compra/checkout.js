// Inicializar con el paso 1 visible
let currentStep = 1;
document.getElementById('step1').classList.add('active');

// Función para ir al siguiente paso
function nextStep(step) {
  // Ocultar el paso actual
  document.getElementById('step' + currentStep).classList.remove('active');
  
  // Mostrar el siguiente paso
  document.getElementById('step' + step).classList.add('active');
  
  currentStep = step;

  // Si llegamos al paso 3, mostrar el resumen
  if (step === 3) {
    showSummary();
  }
}

// Función para mostrar el resumen de la compra
function showSummary() {
  const productList = ["Producto 1", "Producto 2", "Producto 3"].join(', ');
  const paymentMethod = document.getElementById('paymentMethod').value;
  const address = document.getElementById('address').value;

  document.getElementById('productList').textContent = productList;
  document.getElementById('paymentMethodSummary').textContent = paymentMethod;
  document.getElementById('addressSummary').textContent = address;
}

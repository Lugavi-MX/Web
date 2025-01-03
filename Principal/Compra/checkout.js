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
  // Lista de productos seleccionados con sus precios (puedes personalizar esta lista según lo que haya seleccionado el usuario)
  const selectedProducts = [
    { nombre: 'Producto 1', precio: 20 },
    { nombre: 'Producto 2', precio: 30 },
    { nombre: 'Producto 3', precio: 25 }
  ];

  // Obtener el método de pago y dirección
  const paymentMethod = document.getElementById('paymentMethod').value;
  const address = document.getElementById('address').value;

  // Mostrar los productos seleccionados
  const productList = selectedProducts.map(product => `${product.nombre} - $${product.precio}`).join('<br>');
  document.getElementById('productList').innerHTML = productList;

  // Mostrar el método de pago
  let paymentMethodDetails = '';
  const selectedPaymentType = document.getElementById('paymentType').value;
  if (selectedPaymentType === 'credit_card') {
    paymentMethodDetails = `Tarjeta de Crédito: ${document.getElementById('bank').value}, Número: ${document.getElementById('cardNumber').value}`;
  } else {
    paymentMethodDetails = `PayPal: ${document.getElementById('paypalEmail').value}`;
  }
  document.getElementById('paymentMethodSummary').textContent = paymentMethodDetails;

  // Mostrar la dirección de envío
  document.getElementById('addressSummary').textContent = address;

  // Calcular el total de la compra
  const totalAmount = selectedProducts.reduce((total, product) => total + product.precio, 0);
  document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);
}

// Función para abrir el modal
function openPaymentModal() {
  document.getElementById('paymentModal').style.display = 'flex';
}

// Función para cerrar el modal
function closePaymentModal() {
  document.getElementById('paymentModal').style.display = 'none';
}

// Mostrar campos según el tipo de método de pago seleccionado
document.getElementById('paymentType').addEventListener('change', function () {
  const selectedPaymentType = this.value;
  if (selectedPaymentType === 'credit_card') {
    document.getElementById('creditCardFields').style.display = 'block';
    document.getElementById('paypalFields').style.display = 'none';
  } else {
    document.getElementById('creditCardFields').style.display = 'none';
    document.getElementById('paypalFields').style.display = 'block';
  }
});

// Manejo del formulario de nuevo método de pago
document.getElementById('paymentForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const paymentType = document.getElementById('paymentType').value;
  let paymentDetails = {};

  if (paymentType === 'credit_card') {
    paymentDetails = {
      type: 'Tarjeta de Crédito',
      bank: document.getElementById('bank').value,
      cardNumber: document.getElementById('cardNumber').value,
      expiryDate: document.getElementById('expiryDate').value
    };
  } else {
    paymentDetails = {
      type: 'PayPal',
      paypalEmail: document.getElementById('paypalEmail').value
    };
  }

  // Aquí puedes hacer lo que desees con los datos del nuevo método de pago
  console.log(paymentDetails);

  // Cerrar el modal después de agregar el nuevo método
  closePaymentModal();
});

// Función para manejar la selección de las tarjetas de pago
function toggleSelection(paymentCard) {
  // Si la tarjeta ya está seleccionada, la deseleccionamos
  if (paymentCard.classList.contains('selected')) {
    paymentCard.classList.remove('selected');
  } else {
    // Si no está seleccionada, la seleccionamos y deseleccionamos las demás
    const allPaymentCards = document.querySelectorAll('.payment-card');
    allPaymentCards.forEach(card => card.classList.remove('selected')); // Deselecciona todas las tarjetas
    paymentCard.classList.add('selected'); // Selecciona la tarjeta actual
  }
}

// Añadir un evento de clic a cada tarjeta de pago
const paymentCards = document.querySelectorAll('.payment-card');
paymentCards.forEach(card => {
  card.addEventListener('click', function () {
    toggleSelection(card); // Llama a la función de selección al hacer clic
  });
});

// Función para abrir el modal de dirección
function openAddressModal() {
  document.getElementById('addressModal').style.display = 'flex';
}

// Función para cerrar el modal de dirección
function closeAddressModal() {
  document.getElementById('addressModal').style.display = 'none';
}

// Función para manejar el envío del formulario de dirección
document.getElementById('addressForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Obtener los valores del formulario
  const addressName = document.getElementById('addressName').value;
  const streetAddress = document.getElementById('streetAddress').value;
  const city = document.getElementById('city').value;
  const postalCode = document.getElementById('postalCode').value;

  // Aquí puedes hacer algo con la nueva dirección, como agregarla a la lista de direcciones guardadas
  console.log('Nueva Dirección:', addressName, streetAddress, city, postalCode);

  // Cerrar el modal
  closeAddressModal();
});

// Función para editar la dirección (puedes adaptarla según sea necesario)
function editarDireccion(id) {
  console.log('Editar dirección con ID:', id);
}

// Función para eliminar la dirección (puedes adaptarla según sea necesario)
function eliminarDireccion(id) {
  console.log('Eliminar dirección con ID:', id);
}

// Función para manejar la selección de direcciones
function selectAddress(addressCard) {
  // Eliminar la clase 'selected' de todas las direcciones
  const allAddressCards = document.querySelectorAll('.address-card');
  allAddressCards.forEach(card => card.classList.remove('selected'));

  // Agregar la clase 'selected' a la dirección que se ha clickeado
  addressCard.classList.add('selected');
}

// Añadir un evento de clic a cada tarjeta de dirección
const addressCards = document.querySelectorAll('.address-card');
addressCards.forEach(card => {
  card.addEventListener('click', function () {
    selectAddress(card); // Llama a la función de selección al hacer clic
  });
});

// Función para finalizar la compra
function finalizePurchase() {
  // Crear un nuevo spinner
  var opts = {
    lines: 13, // Número de líneas (giro)
    length: 28, // Longitud de las líneas
    width: 14, // Ancho de las líneas
    radius: 42, // Radio del spinner
    scale: 1, // Escala del spinner
    corners: 1, // Esquinas redondeadas
    speed: 1, // Velocidad de animación
    trail: 60, // Deja un rastro al girar
    opacity: 0.25, // Opacidad
    color: '#fff', // Color del spinner
    className: 'spinner', // Clase CSS para el spinner
    zIndex: 2e9, // Nivel de capa
    top: '50%', // Alineación vertical
    left: '50%' // Alineación horizontal
  };

  // Mostrar el loader
  document.getElementById('loader').style.display = 'flex';

  // Iniciar el spinner dentro del contenedor del loader
  var spinner = new Spinner(opts).spin(document.getElementById('loader'));

  // Simular un tiempo de carga de 5 segundos
  setTimeout(function() {
    // Detener el spinner
    spinner.stop();

    // Ocultar el loader
    document.getElementById('loader').style.display = 'none';

    // Mostrar el modal de éxito
    document.getElementById('successModal').style.display = 'flex';
  }, 3000); // 5 segundos
}

// Función para redirigir a la página principal
function redirectToHome() {
  // Redirigir a la página principal
  window.location.href = '/Web/Principal/';
}

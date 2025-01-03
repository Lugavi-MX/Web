// Obtener los elementos del DOM
const menuIcon = document.getElementById('menuIcon');
const sidebar = document.getElementById('sidebar');
const cartIcon = document.getElementById('cartIcon');
const modalCarrito = document.getElementById('modalCarrito');
const closeModal = document.getElementById('closeModal');
const cartCount = document.getElementById('cartCount');
const cartItemsContainer = document.getElementById('cartItems');
const totalPriceElement = document.getElementById('totalPrice');
const checkoutButton = document.getElementById('checkoutButton');

document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.sidebar a');
  const sections = document.querySelectorAll('.section');

  // Función para mostrar una sección específica
  function showSection(sectionId) {
    sections.forEach((section) => {
      section.style.display = section.id === sectionId ? 'block' : 'none';
    });
  }

  // Manejar clics en los enlaces del sidebar
  links.forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const sectionId = this.getAttribute('data-section');
      showSection(sectionId);
    });
  });

  // Mostrar el catálogo por defecto al cargar la página
  showSection('catalog');
});

// Abrir y cerrar el menú lateral al hacer clic en el icono
menuIcon.addEventListener('click', function () {
  sidebar.classList.toggle('active');
});

// Array para almacenar los productos en el carrito
let cart = [];

// Cargar los productos desde el archivo JSON
fetch('products.json')
  .then((response) => response.json())
  .then((data) => {
    const productGrid = document.getElementById('productGrid');

    // Iterar sobre los productos y crear los elementos del catálogo
    data.forEach((product) => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');

      productCard.innerHTML = `
                <img src="${product.imagen}" alt="${product.nombre}">
                <h3>${product.nombre}</h3>
                <p class="price">$${product.precio.toFixed(2)}</p>
                <p class="color">Color: ${product.color}</p>
                <p class="size">Talla: ${product.talla}</p>
                <p class="description">${product.descripcion}</p>
                <button class="btn" data-id="${
                  product.id
                }">Añadir al carrito</button>
            `;

      // Añadir la tarjeta de producto al grid
      productGrid.appendChild(productCard);
    });

    // Agregar funcionalidad al botón "Añadir al carrito"
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        addToCart(productId); // Llamar la función de agregar al carrito
      });
    });
  })
  .catch((error) => console.error('Error al cargar los productos:', error));

// Función para agregar productos al carrito
function addToCart(productId) {
  const product = cart.find((item) => item.id == productId); // Buscar si el producto ya está en el carrito

  if (product) {
    product.cantidad += 1; // Si ya está en el carrito, aumentar la cantidad
  } else {
    // Si no está en el carrito, agregarlo
    const productData = {
      id: productId,
      nombre: document
        .querySelector(`button[data-id="${productId}"]`)
        .closest('.product-card')
        .querySelector('h3').textContent,
      precio: parseFloat(
        document
          .querySelector(`button[data-id="${productId}"]`)
          .closest('.product-card')
          .querySelector('.price')
          .textContent.replace('$', '')
      ),
      imagen: document
        .querySelector(`button[data-id="${productId}"]`)
        .closest('.product-card')
        .querySelector('img').src,
      cantidad: 1,
    };
    cart.push(productData); // Agregar al carrito
  }

  updateCart(); // Actualizar el carrito y contador
}

// Función para actualizar el carrito y mostrarlo en el modal
function updateCart() {
  // Actualiza el contador de productos en el carrito
  cartCount.textContent = cart.length;

  // Actualiza los productos en el modal
  cartItemsContainer.innerHTML = ''; // Limpiar los productos actuales en el modal

  let total = 0; // Variable para calcular el total del carrito

  cart.forEach((item) => {
    // Crear el elemento para cada producto en el carrito
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    // Calcular el precio total del producto (precio unitario * cantidad)
    const itemTotal = item.precio * item.cantidad;
    total += itemTotal;

    cartItem.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}">
            <div class="cart-item-info">
                <h3>${item.nombre}</h3>
                <p>Cantidad: ${item.cantidad}</p>
                <p>Precio: $${item.precio.toFixed(2)}</p>
                <p>Total: $${itemTotal.toFixed(2)}</p>
            </div>
            <button class="btn-delete" data-id="${item.id}">Eliminar</button>
        `;

    // Agregar el producto al carrito en el modal
    cartItemsContainer.appendChild(cartItem);
  });

  // Actualiza el total del carrito
  totalPriceElement.textContent = total.toFixed(2);
}

// Función para eliminar productos del carrito
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId); // Eliminar el producto del carrito
  updateCart(); // Actualizar el carrito después de eliminar el producto
}

// Función para abrir el modal del carrito
cartIcon.addEventListener('click', () => {
  modalCarrito.style.display = 'flex'; // Mostrar el modal
  updateCart(); // Actualizar el contenido del carrito
});

// Función para cerrar el modal del carrito
closeModal.addEventListener('click', () => {
  modalCarrito.style.display = 'none'; // Ocultar el modal
});

// Agregar funcionalidad de eliminación de productos en el carrito
cartItemsContainer.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('btn-delete')) {
    const productId = e.target.getAttribute('data-id');
    removeFromCart(productId); // Llamar a la función para eliminar el producto
  }
});

// Función para realizar la compra
checkoutButton.addEventListener('click', () => {
  alert('Compra realizada con éxito');
  cart = []; // Vaciar el carrito después de la compra
  updateCart(); // Actualizar el carrito y contador
});


function editProfile() {
  alert('Redirigiendo a la página de edición de perfil...');
  // Aquí puedes redirigir a una página de edición, por ejemplo:
  // window.location.href = 'editar-perfil.html';
}

function logout() {
  alert('Has cerrado sesión correctamente.');
  // Aquí puedes realizar la lógica para cerrar sesión, por ejemplo:
  // window.location.href = 'login.html';
}

fetch('pedidos.json')
  .then((response) => response.json())
  .then((data) => {
    const ordersContainer = document.querySelector('.orders');
    data.forEach((pedido) => {
      const orderCard = document.createElement('div');
      orderCard.classList.add('order-card');

      // Crear estructura del pedido
      orderCard.innerHTML = `
        <h2>Pedido #${pedido.id.toString().padStart(3, '0')}</h2>
        <p><strong>Fecha:</strong> ${pedido.fecha}</p>
        <p><strong>Estado:</strong> ${pedido.estado}</p>
        <p><strong>Total:</strong> $${pedido.total.toFixed(2)}</p>
        <div class="order-items"></div>
      `;

      // Agregar los artículos al pedido
      const orderItems = orderCard.querySelector('.order-items');
      pedido.articulos.forEach((articulo) => {
        const orderItem = document.createElement('div');
        orderItem.classList.add('order-item');
        orderItem.innerHTML = `
          <img src="${articulo.imagen}" alt="${articulo.nombre}">
          <p>${articulo.nombre} talla ${articulo.talla} - $${articulo.precio.toFixed(2)}</p>
        `;
        orderItems.appendChild(orderItem);
      });

      ordersContainer.appendChild(orderCard);
    });
  })
  .catch((error) => console.error('Error al cargar los pedidos:', error));


  document.getElementById("checkoutButton").addEventListener("click", function() {
    window.location.href = "compra/";  // Redirige a la página de checkout
  });
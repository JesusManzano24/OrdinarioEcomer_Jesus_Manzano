// Recuperar el carrito desde localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalElement = document.getElementById("cartTotal");
const emptyCartButton = document.getElementById("emptyCartButton");

// Función para corregir rutas de imágenes
function corregirRutaImagen(imagen) {
  if (!imagen || imagen.startsWith('http') || imagen.startsWith('data:')) {
    return imagen || 'placeholder.jpg';
  }
  if (!imagen.includes('/')) {
    return imagen;
  }
  return imagen.replace('img/', '');
}

// Función para actualizar la vista del carrito
function actualizarCarrito() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>El carrito está vacío.</p>";
    cartTotalElement.textContent = "0.00";
  } else {
    cart.forEach((producto, index) => {
      const li = document.createElement("li");
      li.classList.add("cart-item");
      
      const imagenCorregida = corregirRutaImagen(producto.imagen);
      
      li.innerHTML = `
        <div class="cart-product">
          <img src="${imagenCorregida}" alt="${producto.nombre}" class="cart-image"
               onerror="this.onerror=null;this.src='placeholder.jpg'"
               onclick="mostrarImagenAmpliada('${imagenCorregida}')">
          <div class="cart-info">
            <h3>${producto.nombre}</h3>
            <p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
            <p><strong>Cantidad:</strong> ${producto.cantidad || 1}</p>
            ${producto.descripcion ? `<p class="descripcion">${producto.descripcion.substring(0, 50)}...</p>` : ''}
          </div>
          <button class="remove-btn" onclick="eliminarDelCarrito(${index})">❌</button>
        </div>
      `;
      cartItemsContainer.appendChild(li);
      total += producto.precio * (producto.cantidad || 1);
    });
  }

  cartTotalElement.textContent = total.toFixed(2);
  actualizarContadorCarrito();
}

// Función para mostrar imagen ampliada
function mostrarImagenAmpliada(imagenSrc) {
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '1000';
  modal.style.cursor = 'zoom-out';
  
  const img = document.createElement('img');
  img.src = imagenSrc;
  img.style.maxWidth = '90%';
  img.style.maxHeight = '90%';
  img.style.objectFit = 'contain';
  
  modal.appendChild(img);
  modal.onclick = () => document.body.removeChild(modal);
  document.body.appendChild(modal);
}

// Funciones del carrito
function actualizarContadorCarrito() {
  const contador = document.getElementById('cartCounter');
  if (contador) {
    const totalItems = cart.reduce((total, item) => total + (item.cantidad || 1), 0);
    contador.textContent = totalItems;
    contador.style.display = totalItems > 0 ? 'block' : 'none';
  }
}

function eliminarDelCarrito(indice) {
  cart.splice(indice, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  actualizarCarrito();
  alert("Producto eliminado del carrito");
}

function vaciarCarrito() {
  if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
    cart.length = 0;
    localStorage.setItem("cart", JSON.stringify(cart));
    actualizarCarrito();
    alert("Carrito vaciado");
  }
}

// Funciones para manejar los menús
function configurarMenus() {
  // Toggle para menú lateral
  document.getElementById('toggleSideMenu').addEventListener('click', function() {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.classList.toggle('hidden');
    document.getElementById('dotsSideMenu').classList.toggle('hidden');
  });
  
  // Toggle para menú superior
  document.getElementById('toggleTopMenu').addEventListener('click', function() {
    const topMenu = document.getElementById('topMenu');
    topMenu.classList.toggle('hidden');
    document.getElementById('dotsTopMenu').classList.toggle('hidden');
  });
  
  // Mostrar menús al hacer clic en los puntos suspensivos
  document.getElementById('dotsSideMenu').addEventListener('click', function() {
    document.getElementById('sideMenu').classList.remove('hidden');
    this.classList.add('hidden');
  });
  
  document.getElementById('dotsTopMenu').addEventListener('click', function() {
    document.getElementById('topMenu').classList.remove('hidden');
    this.classList.add('hidden');
  });
  
  // Toggle para submenú de categorías
  document.getElementById('toggleCategorias').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('subMenu').classList.toggle('hidden');
  });
  
  // Deshabilitar la navegación de categorías (solo queremos el menú)
  document.querySelectorAll('[data-category]').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      // No hacemos nada al hacer clic en categorías
    });
  });
}

// Función para agregar al carrito
function agregarAlCarrito(nombre, precio, imagen = 'placeholder.jpg', descripcion = '') {
  const precioNumerico = parseFloat(precio.replace('$', '').replace(',', ''));
  const imagenCorregida = corregirRutaImagen(imagen);
  
  const productoExistente = cart.find(item => item.nombre === nombre);
  
  if (productoExistente) {
    productoExistente.cantidad = (productoExistente.cantidad || 1) + 1;
  } else {
    cart.push({ 
      nombre, 
      precio: precioNumerico, 
      imagen: imagenCorregida, 
      descripcion,
      cantidad: 1 
    });
  }
  
  localStorage.setItem("cart", JSON.stringify(cart));
  actualizarCarrito();
  alert(`${nombre} agregado al carrito por $${precioNumerico.toFixed(2)}`);
};

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  actualizarCarrito();
  
  if (emptyCartButton) {
    emptyCartButton.addEventListener("click", vaciarCarrito);
  }
  
  configurarMenus();
});

// Exportar funciones necesarias al ámbito global
window.mostrarImagenAmpliada = mostrarImagenAmpliada;
window.eliminarDelCarrito = eliminarDelCarrito;
window.agregarAlCarrito = agregarAlCarrito;
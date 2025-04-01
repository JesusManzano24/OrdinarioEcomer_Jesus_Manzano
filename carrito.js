// Recuperar el carrito desde localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalElement = document.getElementById("cartTotal");
const emptyCartButton = document.getElementById("emptyCartButton");

// Función para corregir rutas de imágenes (versión para imágenes en misma carpeta)
function corregirRutaImagen(imagen) {
  // Si no hay imagen o es una URL completa, no hacer cambios
  if (!imagen || imagen.startsWith('http') || imagen.startsWith('data:')) {
    return imagen || 'placeholder.jpg';
  }
  
  // Si ya tiene el formato correcto (sin subcarpeta)
  if (!imagen.includes('/')) {
    return imagen;
  }
  
  // Si viene con ruta img/, quitarla (pues las imágenes están en la misma carpeta)
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
      
      // Corregir ruta de la imagen para misma carpeta
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

// Resto de funciones
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
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  actualizarCarrito();
  emptyCartButton.addEventListener("click", vaciarCarrito);
});
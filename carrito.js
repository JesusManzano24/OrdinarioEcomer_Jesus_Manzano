// Recuperar el carrito desde localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalElement = document.getElementById("cartTotal");
const emptyCartButton = document.getElementById("emptyCartButton");

// Función para actualizar la vista del carrito
function actualizarCarrito() {
  cartItemsContainer.innerHTML = ""; // Limpiar el contenedor
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>El carrito está vacío.</p>";
  } else {
    cart.forEach((producto, index) => {
      const li = document.createElement("li");
      li.classList.add("cart-item"); // Clase para mejorar el diseño
      li.innerHTML = `
        <div class="cart-product">
          <img src="${producto.imagen}" alt="${producto.nombre}" class="cart-image">
          <div class="cart-info">
            <h3>${producto.nombre}</h3>
            <p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
          </div>
          <button class="remove-btn" onclick="eliminarDelCarrito(${index})">❌</button>
        </div>
      `;
      cartItemsContainer.appendChild(li);
      total += producto.precio;
    });
  }

  cartTotalElement.textContent = total.toFixed(2); // Mostrar el total
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(indice) {
  cart.splice(indice, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  actualizarCarrito();
}

// Función para vaciar el carrito
emptyCartButton.addEventListener("click", () => {
  cart.length = 0;
  localStorage.setItem("cart", JSON.stringify(cart));
  actualizarCarrito();
});

// Actualizar la vista al cargar la página
document.addEventListener("DOMContentLoaded", actualizarCarrito);
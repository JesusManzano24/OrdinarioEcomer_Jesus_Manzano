const topMenu = document.getElementById('topMenu');
const sideMenu = document.getElementById('sideMenu');
const toggleTopMenu = document.getElementById('toggleTopMenu');
const toggleSideMenu = document.getElementById('toggleSideMenu');
const dotsTopMenu = document.getElementById('dotsTopMenu');
const dotsSideMenu = document.getElementById('dotsSideMenu');
const toggleCategorias = document.getElementById('toggleCategorias');
const subMenu = document.getElementById('subMenu');
const content = document.getElementById("content");

// Productos de ejemplo por categoría
const productos = {
  mangas: [
    { nombre: "Demon Slayer 1", precio: "$200", imagen: "Demon.png", descripcion: "El inicio de una gran aventura." },
    { nombre: "One Piece Vol. 1", precio: "$180", imagen: "onepice.jpg", descripcion: "La búsqueda del tesoro más grande." },
    { nombre: "Dragon Ball Z Vol. 1", precio: "$220", imagen: "dbz.jpg", descripcion: "El clásico del género shōnen." },
    { nombre: "My Hero Academia 1", precio: "$230", imagen: "mha.png", descripcion: "El camino de un héroe." },
    { nombre: "Tokyo Ghoul 1", precio: "$240", imagen: "tokyoghoul.jpg", descripcion: "Un mundo de oscuridad y secretos." },
    { nombre: "Attack on Titan 1", precio: "$250", imagen: "aot.jpg", descripcion: "La lucha por la supervivencia." },
  ],
  figuras: [
    { nombre: "Figura Kurumi Tokisaki", precio: "$500", imagen: "Kurumi.png", descripcion: "Figura de acción coleccionable." },
    { nombre: "Figura Miku Nakano", precio: "$480", imagen: "miku.png", descripcion: "Figura de Miku Nakano de las Quintillizas." },
    { nombre: "Figura Akeno Himejima", precio: "$550", imagen: "Akeno.png", descripcion: "Figura de Akeno Himejima" },
    { nombre: "Figura Darkness", precio: "$600", imagen: "yami.png", descripcion: "Figura de Yami ." },
    { nombre: "Figura Megumin", precio: "$650", imagen: "megumin.png", descripcion: "Figura de Megumin." },
    { nombre: "Figura Rem", precio: "$700", imagen: "rem.png", descripcion: "Figura de Rem." }
  ],
  boxsets: [
    { nombre: "Demon Slayer", precio: "$1200", imagen: "demonboxset.png", descripcion: "Colección completa del anime Demon Slayer." },
    { nombre: "High School DxD", precio: "$1300", imagen: "dxd.png", descripcion: "Boxset con los primeros 12 episodios." },
    { nombre: "Dragon Ball Boxset", precio: "$1250", imagen: "dbzbox.png", descripcion: "Revive las batallas épicas de Dragon Ball." },
    { nombre: "My Hero Academia Boxset", precio: "$1400", imagen: "mhaboxset.png", descripcion: "La colección completa de My Hero Academia." },
    { nombre: "Tokyo Ghoul Boxset", precio: "$1350", imagen: "tokyoghoulboxset.png", descripcion: "Boxset de Tokyo Ghoul." },
    { nombre: "Attack on Titan Boxset", precio: "$1500", imagen: "aotboxset.png", descripcion: "La colección completa de Attack on Titan." }

  ]
};

// Mostrar/Ocultar Submenú de Categorías
toggleCategorias.addEventListener('click', (e) => {
  e.preventDefault();
  subMenu.classList.toggle('hidden');
});

// Control de menús
toggleTopMenu.addEventListener('click', () => {
  topMenu.classList.add('hidden-top-menu');
  toggleTopMenu.classList.add('hidden');
  dotsTopMenu.classList.remove('hidden');
});

toggleSideMenu.addEventListener('click', () => {
  sideMenu.classList.add('hidden-only-menu');
  toggleSideMenu.classList.add('hidden');
  dotsSideMenu.classList.remove('hidden');
  topMenu.style.left = "0";
  topMenu.style.width = "100%";
});

dotsTopMenu.addEventListener('click', () => {
  topMenu.classList.remove('hidden-top-menu');
  toggleTopMenu.classList.remove('hidden');
  dotsTopMenu.classList.add('hidden');
});

dotsSideMenu.addEventListener('click', () => {
  sideMenu.classList.remove('hidden-only-menu');
  toggleSideMenu.classList.remove('hidden');
  dotsSideMenu.classList.add('hidden');
  topMenu.style.left = "250px";
  topMenu.style.width = "calc(100% - 250px)";
});

// Navegación por categorías
document.querySelectorAll("[data-category]").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const categoria = e.target.dataset.category;
    mostrarProductos(categoria);
  });
});

// Función para obtener productos al azar
function obtenerProductosAleatorios(cantidad = 6) {
  const todosLosProductos = [...productos.mangas, ...productos.figuras, ...productos.boxsets];
  return todosLosProductos.sort(() => Math.random() - 0.5).slice(0, cantidad);
}

// Función para mostrar productos en la página de inicio
function mostrarProductosInicio() {
  const productosInicio = obtenerProductosAleatorios();
  content.innerHTML = `<h1>Productos destacados</h1><div class="products"></div>`;
  const productsContainer = content.querySelector(".products");

  productosInicio.forEach(producto => {
    const productHTML = `
      <div class="product">
        <img src="${producto.imagen}" alt="${producto.nombre}" onclick="mostrarImagenAmpliada('${producto.imagen}')">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p><strong>${producto.precio}</strong></p>
        <div class="buttons">
          <button onclick="verProducto('${producto.nombre}', '${producto.precio}', '${producto.descripcion}', '${producto.imagen}')">Ver Producto</button>
          <button onclick="agregarAlCarrito('${producto.nombre}', '${producto.precio}', '${producto.imagen}', '${producto.descripcion}')">Agregar al Carrito</button>
        </div>
      </div>
    `;
    productsContainer.innerHTML += productHTML;
  });
}

// Mostrar productos por categoría
function mostrarProductos(categoria) {
  const productosCategoria = productos[categoria];
  content.innerHTML = productosCategoria && productosCategoria.length > 0 
    ? `<h1>${capitalize(categoria)}</h1><div class="products"></div>` 
    : `<h1>No se encontraron productos para esta categoría.</h1>`;

  if (productosCategoria && productosCategoria.length > 0) {
    const productsContainer = content.querySelector(".products");
    productosCategoria.forEach(producto => {
      const productHTML = `
        <div class="product">
          <img src="${producto.imagen}" alt="${producto.nombre}" onclick="mostrarImagenAmpliada('${producto.imagen}')">
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <p><strong>${producto.precio}</strong></p>
          <div class="buttons">
            <button onclick="verProducto('${producto.nombre}', '${producto.precio}', '${producto.descripcion}', '${producto.imagen}')">Ver Producto</button>
            <button onclick="agregarAlCarrito('${producto.nombre}', '${producto.precio}', '${producto.imagen}', '${producto.descripcion}')">Agregar al Carrito</button>
          </div>
        </div>
      `;
      productsContainer.innerHTML += productHTML;
    });
  }
}

// Vista detallada de producto
function verProducto(nombre, precio, descripcion, imagen) {
  content.innerHTML = `
    <h1>${nombre}</h1>
    <div class="product-details">
      <img src="${imagen}" alt="${nombre}" onclick="mostrarImagenAmpliada('${imagen}')">
      <p><strong>Descripción:</strong> ${descripcion}</p>
      <p><strong>Precio:</strong> ${precio}</p>
      <button onclick="agregarAlCarrito('${nombre}', '${precio}', '${imagen}', '${descripcion}')">Agregar al Carrito</button>
    </div>
  `;
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

// Función mejorada para agregar al carrito
function agregarAlCarrito(nombre, precio, imagen = 'placeholder.jpg', descripcion = '') {
  const precioNumerico = parseFloat(precio.replace('$', ''));
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Verificar si el producto ya existe
  const productoExistente = cart.find(item => item.nombre === nombre);
  
  if (productoExistente) {
    productoExistente.cantidad = (productoExistente.cantidad || 1) + 1;
  } else {
    cart.push({ 
      nombre, 
      precio: precioNumerico, 
      imagen, 
      descripcion,
      cantidad: 1 
    });
  }
  
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${nombre} agregado al carrito por ${precio}`);
  actualizarContadorCarrito();
}

// Actualizar contador del carrito
function actualizarContadorCarrito() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const contador = document.getElementById('cartCounter');
  if (contador) {
    const totalItems = cart.reduce((total, item) => total + (item.cantidad || 1), 0);
    contador.textContent = totalItems;
    contador.style.display = totalItems > 0 ? 'block' : 'none';
  }
}

// Función auxiliar
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  mostrarProductosInicio();
  actualizarContadorCarrito();
});
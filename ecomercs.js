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
    { nombre: "Dragon Ball Z Vol. 1", precio: "$220", imagen: "dbz.jpg", descripcion: "El clásico del género shōnen." }
  ],
  figuras: [
    { nombre: "Figura Kurumi Tokisaki", precio: "$500", imagen: "Kurumi.png", descripcion: "Figura de acción coleccionable." },
    { nombre: "Figura Mikui Nakano", precio: "$480", imagen: "miku.png", descripcion: "Figura de Miku Nakano de las Quintillizas." },
    { nombre: "Figura Akeno Himejima", precio: "$550", imagen: "Akeno.png", descripcion: "Figura de Akeno Himejima" }
  ],
  boxsets: [
    { nombre: "Demon Slayer", precio: "$1200", imagen: "demonboxset.png", descripcion: "Colección completa del anime Demon Slayer." },
    { nombre: "Hihg School Dxd", precio: "$1300", imagen: "dxd.png", descripcion: "Boxset con los primeros 12 episodios." },
    { nombre: "Dragon Ball Boxset", precio: "$1250", imagen: "dbzbox.png", descripcion: "Revive las batallas épicas de Dragon Ball." }
  ]
};

// Mostrar/Ocultar Submenú de Categorías
toggleCategorias.addEventListener('click', (e) => {
  e.preventDefault(); // Evitar que el enlace recargue la página
  subMenu.classList.toggle('hidden'); // Alternar visibilidad del submenú
});

// Ocultar Menú Superior y mostrar los puntos
toggleTopMenu.addEventListener('click', () => {
  topMenu.classList.add('hidden-top-menu');
  toggleTopMenu.classList.add('hidden');
  dotsTopMenu.classList.remove('hidden');
});

// Ocultar Menú Lateral y mostrar los puntos
toggleSideMenu.addEventListener('click', () => {
  sideMenu.classList.add('hidden-only-menu');
  toggleSideMenu.classList.add('hidden');
  dotsSideMenu.classList.remove('hidden');

  // Expandir Menú Superior para abarcar el espacio completo
  topMenu.style.left = "0";
  topMenu.style.width = "100%";
});

// Mostrar Menú Superior y ocultar los puntos
dotsTopMenu.addEventListener('click', () => {
  topMenu.classList.remove('hidden-top-menu');
  toggleTopMenu.classList.remove('hidden');
  dotsTopMenu.classList.add('hidden');
});

// Mostrar Menú Lateral y ocultar los puntos
dotsSideMenu.addEventListener('click', () => {
  sideMenu.classList.remove('hidden-only-menu');
  toggleSideMenu.classList.remove('hidden');
  dotsSideMenu.classList.add('hidden');

  // Restaurar la posición original del Menú Superior
  topMenu.style.left = "250px";
  topMenu.style.width = "calc(100% - 250px)";
});

// Mostrar productos según la categoría seleccionada
document.querySelectorAll("[data-category]").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const categoria = e.target.dataset.category;
    mostrarProductos(categoria);
  });
});

function mostrarProductos(categoria) {
  const productosCategoria = productos[categoria];
  if (!productosCategoria) return;

  // Limpiar el contenido
  content.innerHTML = `<h1>${capitalize(categoria)}</h1><div class="products"></div>`;
  const productsContainer = content.querySelector(".products");

  // Mostrar productos
  productosCategoria.forEach(producto => {
    const productHTML = `
      <div class="product">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p><strong>${producto.precio}</strong></p>
        <div class="buttons">
          <button onclick="verProducto('${producto.nombre}', '${producto.precio}', '${producto.descripcion}', '${producto.imagen}')">Ver Producto</button>
          <button onclick="agregarAlCarrito('${producto.nombre}', '${producto.precio}')">Agregar al Carrito</button>
        </div>
      </div>
    `;
    productsContainer.innerHTML += productHTML;
  });
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function verProducto(nombre, precio, descripcion, imagen) {
  content.innerHTML = `
    <h1>${nombre}</h1>
    <div class="product-details">
      <img src="${imagen}" alt="${nombre}">
      <p><strong>Descripción:</strong> ${descripcion}</p>
      <p><strong>Precio:</strong> ${precio}</p>
      <button onclick="agregarAlCarrito('${nombre}', '${precio}')">Agregar al Carrito</button>
    </div>
  `;
}

function agregarAlCarrito(nombre, precio) {
  alert(`${nombre} agregado al carrito por ${precio}. ¡Próximamente añadiremos la funcionalidad del carrito!`);
}
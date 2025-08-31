// ==========================
// VARIABLES GLOBALES
// ==========================
let carrito = [];
let contadorCarrito = 0;

// Referencias a elementos del DOM
const productosContainer = document.getElementById("productos-container");
const contenedorListaCarrito = document.getElementById("contenedorListaCarrito");
const mySelect = document.getElementById("mySelect");
const totalNum = document.getElementById("totalNum");
const clicksSpan = document.getElementById("clicks");

// ==========================
// LISTA DE PRODUCTOS
// ==========================
const productos = [
  {
    id: 1,
    nombre: "Filete de Pechuga",
    descripcion:
      "Jugoso filete artesanal, sin aditivos, ideal para preparaciones saludables.",
    precio: 28000,
    imagen: "assets/img/meat1.jpg",
  },
  {
    id: 2,
    nombre: "Chuzos de Pollo",
    descripcion:
      "Deliciosos chuzos de pollo adobados, perfectos para la parrilla.",
    precio: 15000,
    imagen: "assets/img/meat2.jpg",
  },
  {
    id: 3,
    nombre: "Pollo a Granel",
    descripcion:
      "Pollo fresco por piezas: muslo, contramuslo, pechuga, pernil y más.",
    precio: 22000,
    imagen: "assets/img/meat3.jpg",
  },
];

// ==========================
// RENDERIZAR PRODUCTOS
// ==========================
function renderizarProductos() {
  productosContainer.innerHTML = "";

  productos.forEach((producto) => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-md-4 col-lg-3";

    col.innerHTML = `
      <div class="card h-100">
        <img class="card-img-top" src="${producto.imagen}" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <hr>
          <p class="card-text">${producto.descripcion}</p>
        </div>
        <div class="card-footer p-3">
          <div class="producto-info text-center mb-2">
            <span class="precio fs-5 fw-bold text-success">$${producto.precio.toLocaleString()}</span>
          </div>
          <div class="producto-controles d-flex flex-column flex-sm-row justify-content-center align-items-center gap-2">
            <div class="cantidad-box d-flex align-items-center gap-2">
              <label for="cantidad-${producto.id}" class="mb-0">Cantidad:</label>
              <input type="number" id="cantidad-${producto.id}" min="1" value="1" class="form-control form-control-sm cantidad-input">
            </div>
            <button onclick="agregarAlCarrito(${producto.id})" class="btn btn-dark btn-sm">
              Agregar
            </button>
          </div>
        </div>
      </div>
    `;
    productosContainer.appendChild(col);
  });
}

// ==========================
// AGREGAR AL CARRITO
// ==========================
function agregarAlCarrito(idProducto) {
  const producto = productos.find((p) => p.id === idProducto);
  const inputCantidad = document.getElementById(`cantidad-${idProducto}`);
  const cantidad = parseInt(inputCantidad.value) || 1;

  // Buscar si ya existe en el carrito
  const productoEnCarrito = carrito.find((p) => p.id === idProducto);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }

  contadorCarrito += cantidad;
  clicksSpan.textContent = contadorCarrito;

  renderizarCarrito();
  openNav(); // Abre el carrito automáticamente
}

// ==========================
// RENDERIZAR CARRITO
// ==========================
function renderizarCarrito() {
  contenedorListaCarrito.innerHTML = "";
  mySelect.innerHTML = "";

  let total = 0;

  carrito.forEach((item, index) => {
    // Mostrar en contenedor
    const div = document.createElement("div");
    
    div.innerHTML = `
    `;
    contenedorListaCarrito.appendChild(div);

    // Mostrar en select
    const option = document.createElement("option");
    option.text = `${item.nombre} (x${item.cantidad})`;
    mySelect.add(option);

    total += item.precio * item.cantidad;
  });

  totalNum.textContent = `$${total.toLocaleString()}`;
}

// ==========================
// ELIMINAR Y VACIAR CARRITO
// ==========================
function eliminarDelCarrito(index) {
  contadorCarrito -= carrito[index].cantidad;
  carrito.splice(index, 1);

  clicksSpan.textContent = contadorCarrito;
  renderizarCarrito();
}

function vaciar() {
  carrito = [];
  contadorCarrito = 0;
  clicksSpan.textContent = contadorCarrito;
  renderizarCarrito();
}

// ==========================
// ABRIR / CERRAR NAV
// ==========================
function openNav() {
  document.getElementById("mySidenav").style.width = "350px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

// ==========================
// INICIALIZAR
// ==========================
document.addEventListener("DOMContentLoaded", renderizarProductos);

// reemplaza/pegalo en app.js

function gestionarEnvio() {
  // obtener datos del formulario
  const nombreCliente = document.getElementById("nombreCliente")?.value.trim() || "";
  const direccionCliente = document.getElementById("direccionCliente")?.value.trim() || "";

  // normalizar carrito: puede ser array o un objeto indexado
  const items = Array.isArray(carrito) ? carrito : Object.values(carrito || {});

  // 1) validaciones
  if (!items || items.length === 0) {
    alert("🛑 Debes agregar productos antes de gestionar el envío.");
    return;
  }

  if (nombreCliente === "" || direccionCliente === "") {
    alert("⚠️ Por favor completa el nombre y la dirección antes de gestionar el envío.");
    return;
  }

  // 2) construir mensaje bonito y compatible con WhatsApp
  const fecha = new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" });
  const encabezado = "✅ *Pedido desde la web*";
  const separador = "——————————————";

  const lineas = [];
  lineas.push(encabezado);
  lineas.push(`🕒 ${fecha}`);
  lineas.push(separador);
  lineas.push("");
  lineas.push("🛒 *Productos:*");

  // agrega cada producto (sin precio) — usa • para lista bonita
  items.forEach(it => {
    // si tu item tiene { nombre, cantidad } o { nombre, cantidad, id } etc.
    const nombre = it.nombre || it.name || "Producto";
    const cantidad = it.cantidad ?? it.qty ?? 1;
    lineas.push(`• ${nombre} x${cantidad}`);
  });

  lineas.push("");
  lineas.push(`👤 *Cliente:* ${nombreCliente}`);
  lineas.push(`📍 *Dirección:* ${direccionCliente}`);
  lineas.push("");
  lineas.push("");
  lineas.push("🙏 ¡Gracias por tu compra!");

  const mensaje = lineas.join("\n");

  // 3) configurar número y abrir WhatsApp
  const telefonoEmpresa = "573106053919"; // <- tu número (sin +)
  const url = `https://wa.me/${telefonoEmpresa}?text=${encodeURIComponent(mensaje)}`;

  // debug: descomenta si necesitas ver el mensaje en consola
  // console.log("Mensaje WA:", mensaje);

  window.open(url, "_blank");
}

// conectar listener de manera segura (por si el script se carga antes del DOM)
document.addEventListener("DOMContentLoaded", () => {
  const pagarBtn = document.getElementById("pagarBoton");
  if (pagarBtn) {
    // remover listeners previos evitando duplicados
    pagarBtn.removeEventListener("click", gestionarEnvio);
    pagarBtn.addEventListener("click", gestionarEnvio);
  } else {
    console.warn("No se encontró #pagarBoton al cargar el DOM.");
  }
});

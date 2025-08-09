// 🔁 Objeto de productos
const productos = {
    1: {
        nombre: "Filete de Pechuga",
        descripcion: "Jugoso filete artesanal, sin aditivos, ideal para preparaciones saludables.",
        precio: 28000,
        imagen: "../assets/img/meat1.jpg"
    },
    2: {
        nombre: "Chuzos de Pollo",
        descripcion: "Deliciosos chuzos de pollo adobados, perfectos para la parrilla.",
        precio: 29500,
        imagen: "../assets/img/meat2.jpg"
    },
    3: {
        nombre: "Pollo a Granel",
        descripcion: "Pollo fresco por piezas, ideal para restaurantes y hogares.",
        precio: 12000,
        imagen: "../assets/img/meat3.jpg"
    }
};

// 🧠 Variables de estado
let total = 0;
let clicks = 0;
let carrito = [];

// Función que actualiza la vista del carrito en escritorio y móvil
function actualizarVistaCarrito() {
    const select = document.getElementById("mySelect");
    const contenedorLista = document.getElementById("contenedorListaCarrito");

    if (!select || !contenedorLista) return;

    // Limpiar select y contenedor de lista móvil
    select.innerHTML = "";
    contenedorLista.innerHTML = "";

    if (/Mobi|Android/i.test(navigator.userAgent)) {
        // Móvil: ocultar select y mostrar lista ul
        select.style.display = "none";

        const lista = document.createElement("ul");
        lista.id = "lista-carrito-movil";
        lista.style.maxHeight = "180px";
        lista.style.overflowY = "auto";
        lista.style.padding = "0";
        lista.style.margin = "10px 0";
        lista.style.listStyle = "none";
        lista.style.color = "white";

        carrito.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.cantidad} x ${item.nombre}`;
            li.style.padding = "6px 10px";
            li.style.borderBottom = "1px solid rgba(255,255,255,0.2)";
            lista.appendChild(li);
        });

        contenedorLista.appendChild(lista);

    } else {
        // Escritorio: mostrar select y llenarlo
        select.style.display = "block";

        carrito.forEach(item => {
            const option = document.createElement("option");
            option.text = `${item.cantidad} x ${item.nombre}`;
            select.add(option);
        });
    }
}

// 🔓 Abrir carrito
function openNav() {
    document.getElementById("mySidenav").style.width = "350px";
}

// 🔒 Cerrar carrito
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

// ➕ Agregar al carrito
function agregarAlCarrito(idProducto) {
    const producto = productos[idProducto];
    if (!producto) return;

    const inputCantidad = document.getElementById(`cantidad-${idProducto}`);
    let cantidad = parseInt(inputCantidad.value);

    if (isNaN(cantidad) || cantidad < 1) {
        cantidad = 1;
    }

    const productoExistente = carrito.find(p => p.id === idProducto);
    if (productoExistente) {
        productoExistente.cantidad += cantidad;
    } else {
        carrito.push({
            id: idProducto,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidad
        });
    }

    // Limpiar input
    inputCantidad.value = "";

    // Actualizar vista (select o lista móvil)
    actualizarVistaCarrito();

    // Actualizar contador
    clicks += cantidad;
    document.getElementById("clicks").innerHTML = clicks;

    // Abrir el carrito automáticamente
    openNav();
}

// 🧹 Vaciar carrito
function vaciar() {
    carrito = [];
    clicks = 0;
    total = 0;

    // Limpiar contador y total visualmente
    document.getElementById("clicks").innerHTML = "0";
    document.getElementById("totalNum").innerHTML = "$ 0";

    // Actualizar vista (limpia select y lista móvil)
    actualizarVistaCarrito();
}

// Resto de código que tienes (eventos, gestionar envío, etc.)

document.addEventListener("DOMContentLoaded", () => {
    const navItem = document.getElementById("navContacto");
    const submenu = document.getElementById("submenuContacto");

    if (navItem && submenu) {
        navItem.addEventListener("mouseenter", () => {
            navItem.classList.add("show");
            submenu.classList.add("show");
        });

        navItem.addEventListener("mouseleave", () => {
            navItem.classList.remove("show");
            submenu.classList.remove("show");
        });

        // Previene que el clic en el enlace principal recargue
        const isContacto = window.location.pathname.includes("contacto.html");
        if (isContacto) {
            const linkContacto = document.getElementById("menuContacto");
            if (linkContacto) {
                linkContacto.addEventListener("click", (e) => e.preventDefault());
            }
        }
    }
});

document.getElementById("pagarBoton").addEventListener("click", gestionarEnvio);

function gestionarEnvio() {
    const nombre = document.getElementById("nombreCliente").value.trim();
    const direccion = document.getElementById("direccionCliente").value.trim();

    if (!nombre || !direccion) {
        alert("Por favor completa todos los datos del comprador.");
        return;
    }

    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let mensaje = `📦 *Nueva compra desde la web*\n\n👤 *Cliente:* ${nombre}\n📍 *Dirección:* ${direccion}\n\n🛒 *Productos:* \n`;

    carrito.forEach(item => {
        mensaje += `- ${item.cantidad} x ${item.nombre}\n`;
    });

    const numeroWhatsApp = "573106053919";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
}

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

// Función para actualizar el <select> (vista escritorio)
function actualizarSelect() {
    const select = document.getElementById("mySelect");
    if (!select) return;

    // Limpiar opciones
    select.innerHTML = "";

    // Añadir opciones del carrito
    carrito.forEach(item => {
        const option = document.createElement("option");
        option.text = `${item.cantidad} x ${item.nombre}`;
        select.add(option);
    });

    // Mostrar select solo en escritorio
    if (!/Mobi|Android/i.test(navigator.userAgent)) {
        select.style.display = "block";
    } else {
        select.style.display = "none";
    }
}

// Función para actualizar lista <ul> móvil
function actualizarListaMovil() {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        const select = document.getElementById("mySelect");
        if (!select) return;

        // Eliminar lista previa si existe
        const listaExistente = document.getElementById("lista-carrito-movil");
        if (listaExistente) listaExistente.remove();

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

        select.parentNode.appendChild(lista);
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

    // Actualizar vistas
    actualizarSelect();
    actualizarListaMovil();

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

    const select = document.getElementById("mySelect");
    if (select) {
        select.innerHTML = "";
        select.style.display = "block"; // Para escritorio
    }

    const listaExistente = document.getElementById("lista-carrito-movil");
    if (listaExistente) listaExistente.remove();

    const totalElemento = document.getElementById("totalNum");
    const contadorElemento = document.getElementById("clicks");

    if (totalElemento) totalElemento.innerHTML = "";
    if (contadorElemento) contadorElemento.innerHTML = "0";
}

// Gestión del envío (igual que antes)
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

// Inicializar vistas al cargar página
document.addEventListener("DOMContentLoaded", () => {
    actualizarSelect();
    actualizarListaMovil();
});

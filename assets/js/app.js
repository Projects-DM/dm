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

    // Actualizar el select con la lista actualizada
    actualizarSelect();

    // Actualizar lista móvil si aplica
    actualizarListaMovil();

    // Actualizar contador
    clicks += cantidad;
    document.getElementById("clicks").innerHTML = clicks;

    // Abrir el carrito automáticamente
    openNav();
}

// Actualiza el contenido del select desde el array carrito
function actualizarSelect() {
    const select = document.getElementById("mySelect");
    if (!select) return;

    select.innerHTML = ""; // limpiar

    carrito.forEach(item => {
        const option = document.createElement("option");
        option.text = `${item.cantidad} x ${item.nombre}`;
        select.add(option);
    });

    // Mostrar select solo en escritorio
    if (!/Mobi|Android/i.test(navigator.userAgent)) {
        select.style.display = "block";
    }
}

// Función que crea la lista visible para móvil y oculta el select
function actualizarListaMovil() {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        const select = document.getElementById("mySelect");
        if (!select) return;

        // Eliminar lista móvil previa si existe
        const listaExistente = document.getElementById("lista-carrito-movil");
        if (listaExistente) listaExistente.remove();

        // Crear nueva lista
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

        select.style.display = "none"; // ocultar select en móvil
        select.parentNode.appendChild(lista);
    }
}

// 🧹 Vaciar carrito
function vaciar() {
    carrito = [];
    clicks = 0;
    total = 0;

    // Limpiar select y mostrarlo (para escritorio)
    const select = document.getElementById("mySelect");
    if (select) {
        select.innerHTML = "";
        select.style.display = "block";
    }

    // Eliminar lista móvil si existe
    const listaExistente = document.getElementById("lista-carrito-movil");
    if (listaExistente) listaExistente.remove();

    // Actualizar contador y total
    const totalElemento = document.getElementById("totalNum");
    const contadorElemento = document.getElementById("clicks");

    if (totalElemento) {
        totalElemento.innerHTML = "$ 0";
    }
    if (contadorElemento) {
        contadorElemento.innerHTML = "0";
    }
}

// Resto de tu código (eventos, gestionarEnvio, etc.) sin cambios

// Por si quieres, puedes llamar a actualizarSelect() y actualizarListaMovil() al cargar la página, 
// para sincronizar la vista si hay datos en carrito almacenados (no está en tu código actual pero lo puedes agregar):

document.addEventListener("DOMContentLoaded", () => {
    actualizarSelect();
    actualizarListaMovil();

    // Resto de listeners y lógica que ya tienes...
});

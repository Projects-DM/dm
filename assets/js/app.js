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

// 🖨️ Mostrar valores iniciales
document.getElementById("totalNum").innerHTML = "$ 0";
document.getElementById("clicks").innerHTML = "0";

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

    // Agregar al <select>
    const select = document.getElementById("mySelect");
    const option = document.createElement("option");
    option.text = `${cantidad} x ${producto.nombre}`;
    select.add(option);

    // Actualizar total
    total += producto.precio * cantidad;
    document.getElementById("totalNum").innerHTML = "$ " + total.toLocaleString("es-CO");

    // Actualizar contador
    clicks += cantidad;
    document.getElementById("clicks").innerHTML = clicks;

    // Abrir el carrito automáticamente
    openNav();
}

// 🧹 Vaciar carrito
function vaciar() {
    const select = document.getElementById("mySelect");
    select.innerHTML = "";

    total = 0;
    clicks = 0;
    carrito = [];

    document.getElementById("totalNum").innerHTML = "$ 0";
    document.getElementById("clicks").innerHTML = "0";
}

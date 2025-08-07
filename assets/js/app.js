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
    //total += producto.precio * cantidad;
    //document.getElementById("totalNum").innerHTML = "$ " + total.toLocaleString("es-CO");

    // Actualizar contador
    clicks += cantidad;
    document.getElementById("clicks").innerHTML = clicks;

    // Abrir el carrito automáticamente
    openNav();
}


// 🧹 Vaciar carrito
function vaciar() {
    const select = document.getElementById("mySelect");
    const totalElemento = document.getElementById("totalNum");
    const contadorElemento = document.getElementById("clicks");

    // Limpiar el select
    select.innerHTML = "";

    // Reiniciar variables
    total = 0;
    clicks = 0;
    carrito = [];

    // Actualizar total visualmente
    if (totalElemento) {
        totalElemento.innerHTML = "$ 0";
    }

    // Actualizar contador visualmente
    if (contadorElemento) {
        contadorElemento.innerHTML = "0";
    }
}


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

    // Si deseas seguir mostrando los precios borar las siguientes 3 lineas y descomentar la siguiente
    carrito.forEach(item => {
        mensaje += `- ${item.cantidad} x ${item.nombre}\n`;
    });
    carrito.forEach(p => {
        // Si más adelante deseas volver a mostrar el precio, descomenta la línea de abajo y comenta la siguiente
        // mensaje += `- ${p.cantidad} x ${p.nombre} ($${p.precio.toLocaleString("es-CO")})\n`;
        //mensaje += `- ${p.cantidad} x ${p.nombre}\n`;
    });

    // Si más adelante deseas volver a mostrar el total, descomenta estas dos líneas
    /*
    const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
    mensaje += `\n💰 *Total:* $${total.toLocaleString("es-CO")}`;
    */

    const numeroWhatsApp = "573106053919";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
}

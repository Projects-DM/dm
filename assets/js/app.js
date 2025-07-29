const productos = {
    1: {
        nombre: "Filete de Pechuga",
        descripcion: "Jugoso filete artesanal, sin aditivos, ideal para preparaciones saludables. Corte natural y tierno, listo para asar, freír o empanar.",
        precio: 28000,
        imagen: "../assets/img/meat1.jpg"
    },
    2: {
        nombre: "Chuzos de Pollo",
        descripcion: "Deliciosos chuzos de pollo adobados, perfectos para la parrilla. Prácticos, sabrosos y listos para cocinar en minutos.",
        precio: 29500,
        imagen: "../assets/img/meat2.jpg"
    },
    3: {
        nombre: "Pollo a Granel",
        descripcion: "Pollo fresco por piezas: muslo, contramuslo, pechuga, pernil y rabadilla jugosa. Ideal para restaurantes, negocios, hogares y preparaciones al gusto.",
        precio: 12000,
        imagen: "../assets/img/meat3.jpg"
    }
};


var carneUnoprecio = 200;

function mostrarProductos() {
    console.log(productos[2].precio.precioNormal);
}

function openNav() {
    document.getElementById("mySidenav").style.width = "350px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function meatUno() {
    var x = document.getElementById("mySelect");
    var option = document.createElement("option");


    option.text = "Filete de Pechuga";
    var btn = document.createElement("button");
    btn.innerHTML = "";
    option.appendChild(btn);

    x.add(option);




    var precio1 = 28.000;
    document.getElementById("totalNum").innerHTML = "$ " + precio1;

    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;

}


function meatDos() {
    var x = document.getElementById("mySelect");
    var option = document.createElement("option");

    option.text = "Chuzos de Pollo";

    x.add(option);


    var precio2 = 29.500;
    document.getElementById("totalNum").innerHTML = "$ " + precio2;

    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
}

function meatTres() {
    var x = document.getElementById("mySelect");
    var option = document.createElement("option");
    option.text = "Pollo a Granel";
    x.add(option);

    var precio3 = 12.000;
    document.getElementById("totalNum").innerHTML = "$ " + precio3;

    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;

    return precio3
}



function vaciar() {
    var select = document.getElementById("mySelect");
    var length = select.options.length;
    for (i = length - 1; i >= 0; i--) {
        select.options[i] = null;
    }
    var precio = 0;
    document.getElementById("totalNum").innerHTML = "$ " + precio;

    clicks = 0;
    document.getElementById("clicks").innerHTML = clicks;
}

var clicks = 0;






var precio = 0;
document.getElementById("totalNum").innerHTML = "$ " + precio;
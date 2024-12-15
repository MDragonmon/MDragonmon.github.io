let contenedorProductos = document.querySelector("#contenedor-productos");
let btnCat = document.querySelectorAll(".boton-categoria");
let carritoN = document.querySelector("#numerito");
let barraLateral = document.querySelector(".aside-visible");
let footer = document.querySelector("footer");
let tituloPrincipal = document.querySelector("#titulo-principal");
let btnTodos = document.querySelector("#todos");

let productos = [];

function cargarProductos() {
    fetch('./js/productos.json')
        .then((respuesta) => respuesta.json())
        .then((data) => {
            productos = data;
            mostrarProductos(productos);
            eventoAgregar();
        })
        .catch((error) => {
            console.error("Error al cargar los productos:", error);
        });
}

function mostrarProductos(listaProductos) {
    contenedorProductos.innerHTML = "";
    listaProductos.forEach(producto => {
        let productoHTML = document.createElement("div");
        productoHTML.classList.add("producto");
        productoHTML.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" data-id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.appendChild(productoHTML);
    });
}

btnCat.forEach(boton => {
    boton.addEventListener("click", (e) => {
        let categoria = e.currentTarget.id;
        btnCat.forEach(i => {
            i.classList.remove("active");
            let icono = i.querySelector("i");
            icono.classList.remove("bi-hand-index-thumb-fill");
            icono.classList.add("bi-hand-index-thumb");
        });

        e.currentTarget.classList.add("active");
        let iconoSeleccionado = e.currentTarget.querySelector("i");
        iconoSeleccionado.classList.remove("bi-hand-index-thumb");
        iconoSeleccionado.classList.add("bi-hand-index-thumb-fill");

        if (categoria === "todos") {
            tituloPrincipal.innerHTML = "Todos los productos";
            mostrarProductos(productos);
        } else {
            let productosFiltrados = productos.filter(producto => producto.categoria.id === categoria);
            tituloPrincipal.innerHTML = productosFiltrados[0]?.categoria.nombre || "Categoría";
            mostrarProductos(productosFiltrados);
        }
        eventoAgregar();
    });
});


btnTodos.addEventListener("click", () => {
    mostrarProductos(productos);
    tituloPrincipal.innerHTML = "Todos los productos";
    eventoAgregar();
});

let carrito = [];

function agregarCarrito(idProducto) {
    let productoSeleccionado = productos.find(producto => producto.id == idProducto);
    if (productoSeleccionado) {
        let productoEnCarrito = carrito.find(producto => producto.id == idProducto);
        if (!productoEnCarrito) {
            carrito.push({ ...productoSeleccionado, cantidad: 1 });
        } else {
            productoEnCarrito.cantidad++;
        }
        actualizarNCarrito();
        localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
        console.error("El producto no existe");
    }
}

function actualizarNCarrito() {
    let totalProductos = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    carritoN.textContent = totalProductos;
}

function cargarCarritoDesdeLocalStorage() {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    actualizarNCarrito();
}

cargarCarritoDesdeLocalStorage();

function eventoAgregar() {
    let btnAgregar = document.querySelectorAll(".producto-agregar");
    btnAgregar.forEach(button => {
        button.addEventListener("click", (e) => {
            let idProducto = e.currentTarget.getAttribute("data-id");
            agregarCarrito(idProducto);
        });
    });
}

cargarProductos();

let btnAbrirBarraLateral = document.querySelector(".open-menu");
let btnCerrarBarraLateral = document.querySelector(".close-menu");

function mostrarBarraLateral(aside) {
    if (window.innerWidth < 601) {
        if (aside.style.display = "none") {
            aside.style.display = "block";
            aside.style.position = "fixed";
            btnCerrarBarraLateral.style.display = "block";
        }
    }

    if (window.innerWidth > 601){
        aside.style.display = "block";
        aside.style.position = "sticky";
    }
}

btnAbrirBarraLateral.addEventListener("click", () => {
    mostrarBarraLateral(barraLateral);
});

function cerrarBarraLateral(aside) {
    if (window.innerWidth < 601) {
        if (aside.style.display = "block") {
            aside.style.display = "none";
            btnCerrarBarraLateral.style.display = "none";
        }
    }
}

btnCerrarBarraLateral.addEventListener("click", () => {
    cerrarBarraLateral(barraLateral);
});

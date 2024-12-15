document.addEventListener("DOMContentLoaded", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let carritoProductos = document.querySelector("#carrito-productos");
    let totalPrecio = document.querySelector("#Total");
    let numerito = document.querySelector("#numerito");
    let vaciarCarritoBtn = document.querySelector(".carrito-acciones-vaciar");
    let comprarAhoraBtn = document.querySelector("#comprarAhora");
    let mensajeVacio = document.querySelector("#carrito-vacio");
    let carritoAcciones = document.querySelector("#carrito-acciones");
    let compra = document.querySelector("#carrito-comprado")
    let barraLateral = document.querySelector(".aside-visible");


    function renderizarCarrito() {
        carritoProductos.innerHTML = "";

        let total = 0;

        carrito.forEach((producto, index) => {
            let subtotal = producto.precio * producto.cantidad + (producto.precio * producto.cantidad) * 0.21;
            total += subtotal;

            let div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.titulo}" class="carrito-producto-imagen">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${Math.trunc(subtotal)}</p>
                </div>
                <button class="carrito-producto-comprar" data-index="${index}"><i class="bi bi-bag-fill"></i>Comprar</button>
                <button class="carrito-producto-eliminar" data-index="${index}"><i class="bi bi-trash-fill"></i>Eliminar</button>
            `;
            carritoProductos.appendChild(div);
        });

        carritoAcciones.innerHTML = `
            <div id="carrito-acciones" class="carrito-acciones">
                <div class="carrito-acciones-izquierda">
                    <button class="carrito-acciones-vaciar">Vaciar carrito</button>
                </div>

                <div class="carrito-acciones-derecha">
                    <div class="carrito-acciones-total">
                        <p>Total:</p>
                        <p id="Total">$${Math.trunc(total)}</p>
                    </div>
                    <button class="carrito-acciones-comprar">Comprar ahora</button>
                </div>
            </div>
        `;

        numerito.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);

        if (carrito.length === 0) {
            mensajeVacio.style.display = "block";
            carritoProductos.style.display = "none";
            numerito.textContent = "0";
            totalPrecio.innerHTML = `0`;
            return;
        }
        mensajeVacio.style.display = "none";
        carritoProductos.style.display = "block";

        asignarEventosBotones();
    }

    function asignarEventosBotones() {

        let vaciarCarritoBtn = document.querySelector(".carrito-acciones-vaciar");
        if (vaciarCarritoBtn) {
            vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
        }

        let comprarAhoraBtn = document.querySelector(".carrito-acciones-comprar");
        if (comprarAhoraBtn) {
            comprarAhoraBtn.addEventListener("click", comprarAhora);
        }
    }

    function vaciarCarrito() {
        if (confirm("¿Estás seguro que quieres vaciar el carrito?")) {
            carrito = [];
            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderizarCarrito();
            mensajeVacio.style.display = "block";
        }
        
    }

    function eliminarProducto(index) {
        if (confirm("¿Quieres eliminar este producto?")) {
            if (carrito[index].cantidad > 1) {
                carrito[index].cantidad--;
            } else {
                carrito.splice(index, 1);
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderizarCarrito();
        }
    }

    function comprarAhora() {
        let total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        if (carrito.length > 0) {
            alert(`¿Estás seguro que quieres comprar todos los productos por un total de $${total}?`);
            carrito = [];
            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderizarCarrito(compra);
            renderizarCarrito();
        }
    }

    function comprarProducto(index) {
        if (confirm("¿Quieres comprar este producto?")) {
            if (carrito[index].cantidad > 1) {
                carrito[index].cantidad--;
            } else {
                carrito.splice(index, 1);
            }
            alert();

            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderizarCarrito(compra);
        }
    }

    carritoProductos.addEventListener("click", (e) => {
        if (e.target.classList.contains("carrito-producto-comprar")) {
            const index = e.target.dataset.index;
            comprarProducto(index);
        }
    });

    carritoProductos.addEventListener("click", (e) => {
        if (e.target.classList.contains("carrito-producto-eliminar")) {
            const index = e.target.dataset.index;
            eliminarProducto(index);
        }
    });

    let btnAbrirBarraLateral = document.querySelector(".open-menu");
    let btnCerrarBarraLateral = document.querySelector(".close-menu");

    function mostrarBarraLateral(aside) {
        aside.style.display = "block"; 
        aside.style.position = "fixed";
        btnCerrarBarraLateral.style.display = "block";
    }

    function cerrarBarraLateral(aside) {
        aside.style.display = "none"; 
        btnCerrarBarraLateral.style.display = "none"; 
    }

    btnAbrirBarraLateral.addEventListener("click", () => {
        mostrarBarraLateral(barraLateral);
    });

    btnCerrarBarraLateral.addEventListener("click", () => {
        cerrarBarraLateral(barraLateral);
    });

    renderizarCarrito();
});

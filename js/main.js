let productos = [];
fetch("js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

// Elementos del DOM
const contenedorProductos = document.querySelector(".contenedor-productos");
const botonesCategorias = document.querySelectorAll(".btn-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const cantidadProductosCarrito = document.querySelector(".cantidad-carrito");

// Agregar luego de que el hml y el css esten listos
document.addEventListener("DOMContentLoaded", () => {
    categorias();
});

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(producto => {
        // Creamos el div para producto
        let divProducto = document.createElement("DIV");
        divProducto.classList.add("producto");
        // Creamos la imagen
        let img = document.createElement("IMG");
        img.classList.add("producto-imagen");
        img.src = producto.imagen;
        img.alt = producto.titulo;
        divProducto.appendChild(img);

        // Creamos otro div para los detalles del producto 
        let divDetallesProducto = document.createElement("DIV")
        divDetallesProducto.classList.add("producto-detalles");
        // Creamos un titulo que ira en divDetallesProducto
        let h3 = document.createElement("H3");
        h3.classList.add("producto-titulo");
        h3.textContent = producto.titulo
        divDetallesProducto.appendChild(h3);
        // Creamos un parrafo que ira en divDetallesProducto
        let p = document.createElement("P");
        p.classList.add("producto-precio");
        p.textContent = producto.precio;
        divDetallesProducto.appendChild(p);
        // Creamos un boton que ira en divDetallesProducto
        let btn = document.createElement("BUTTON");
        btn.classList.add("producto-agregar");
        btn.textContent = "Agregar";
        btn.id = producto.id;
        divDetallesProducto.appendChild(btn);

        // Agregamos el div de detalles al div de productos 
        divProducto.appendChild(divDetallesProducto);

        // Agregamos el div de productos al contenedorProductos
        contenedorProductos.appendChild(divProducto)
    });
    actualizarBotonesAgregar();
};

function categorias() {
    botonesCategorias.forEach(btn => {
        btn.addEventListener("click", (e)=> {
            botonesCategorias.forEach(btn => btn.classList.remove("active"));
            e.currentTarget.classList.add("active");

            if (e.currentTarget.id != "todos") {
                const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
                tituloPrincipal.textContent = productoCategoria.categoria.nombre;

                const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
                cargarProductos(productosBoton);
            } else {
                tituloPrincipal.textContent = "Todos los productos";
                cargarProductos(productos);
            }
        });
    });
};

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(btn => {
        btn.addEventListener("click", agregarProductoAlCarrito);
    });
};

let carrito;
let carritoLS = localStorage.getItem("productos-en-carrito");
if(carritoLS) {
    carrito = JSON.parse(carritoLS);
    actualizarCantidadProductosCarrito();
} else {
    carrito = [];
}

function agregarProductoAlCarrito(e) {
    Toastify({
        text: "Producto Agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: "1.2rem",
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    if (carrito.some(producto => producto.id === idBoton)) {
        const index = carrito.findIndex(producto => producto.id === idBoton);
        carrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        carrito.push(productoAgregado);
    };
    actualizarCantidadProductosCarrito();
    // Agregar al localStorage: localStorage es una API de almacenamiento web proporcionada por los navegadores modernos que permite almacenar datos de manera persistente en el navegador del usuario. Los datos almacenados en localStorage no tienen fecha de expiración, lo que significa que permanecen disponibles incluso después de cerrar el navegador o reiniciar el dispositivo.
    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
};

function actualizarCantidadProductosCarrito() {
    cantidadCarrito = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    cantidadProductosCarrito.textContent = cantidadCarrito;
}
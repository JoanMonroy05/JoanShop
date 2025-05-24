// Extraer la informacion del localStorage
const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

// Elementos del DOM
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".producto-carrito-eliminar");
const botonVaciar = document.querySelector(".carrito-acciones-vaciar");
const botonComprar = document.querySelector(".carrito-acciones-comprar");
let total = document.querySelector("#total");

// Agregar luego de que el hml y el css esten listos
document.addEventListener("DOMContentLoaded", () => {
    cargarProductosCarrito()
});

function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("ocultar");
        contenedorCarritoProductos.classList.remove("ocultar");
        contenedorCarritoAcciones.classList.remove("ocultar");
        contenedorCarritoComprado.classList.add("ocultar");
        contenedorCarritoProductos.innerHTML = "";
        crearProducto();
    } else {
        contenedorCarritoVacio.classList.remove("ocultar");
        contenedorCarritoProductos.classList.add("ocultar");
        contenedorCarritoAcciones.classList.add("ocultar");
        contenedorCarritoComprado.classList.add("ocultar");
    }
    calcularTotal();
    actualizarBotonesEliminar();
}

function crearProducto() {
    productosEnCarrito.forEach(producto => {
        // Creamos un div que contendra a los productos
        let divProducto = document.createElement("DIV");
        divProducto.classList.add("carrito-producto");

        // Creamos la imagen
        let img = document.createElement("IMG");
        img.classList.add("carrito-producto-imagen");
        img.src = producto.imagen;
        img.alt = producto.titulo;
        divProducto.appendChild(img);

        // Creamos otro div para el titulo
        let divTitulo = document.createElement("DIV");
        divTitulo.classList.add("carrito-producto-titulo");
        divProducto.appendChild(divTitulo);

        // Creamos el contenido del divTitulo
        let txtTitulo = document.createElement("SMALL");
        txtTitulo.textContent = "Título";
        divTitulo.appendChild(txtTitulo);
        let h3 = document.createElement("H3");
        h3.textContent = producto.titulo;
        divTitulo.appendChild(h3);

        // Creamos otro div para cantidad
        let divCantidad = document.createElement("DIV");
        divCantidad.classList.add("carrito-producto-cantidad");
        divProducto.appendChild(divCantidad);

        // Creamos el contenido del divCantidad
        let txtCantidad = document.createElement("SMALL");
        txtCantidad.textContent = "Cantidad";
        divCantidad.appendChild(txtCantidad);
        let pCantidad = document.createElement("P");
        pCantidad.textContent = producto.cantidad;
        divCantidad.appendChild(pCantidad);

        // Creamos otro div para precio
        let divPrecio = document.createElement("DIV");
        divPrecio.classList.add("carrito-producto-precio");
        divProducto.appendChild(divPrecio);

        // Creamos el contenido del divPrecio
        let txtPrecio = document.createElement("SMALL");
        txtPrecio.textContent = "Precio";
        divPrecio.appendChild(txtPrecio);
        let pPrecio = document.createElement("P");
        pPrecio.textContent = `$${producto.precio}`;
        divPrecio.appendChild(pPrecio);

        // Creamos otro div para subtotal
        let divSubtotal = document.createElement("DIV");
        divSubtotal.classList.add("carrito-producto-subtotal");
        divProducto.appendChild(divSubtotal);

        // Creamos el contenido del divSubtotal
        let txtSubtotal = document.createElement("SMALL");
        txtSubtotal.textContent = "Subtotal";
        divSubtotal.appendChild(txtSubtotal);
        let pSubtotal = document.createElement("P");
        pSubtotal.textContent = `$${producto.precio * producto.cantidad}`;
        divSubtotal.appendChild(pSubtotal);

        // Creamos un botón para eliminar el producto
        let btnEliminar = document.createElement("BUTTON");
        btnEliminar.classList.add("producto-carrito-eliminar");
        btnEliminar.innerHTML = '<i class="bi bi-trash-fill"></i>';
        btnEliminar.id = producto.id;
        divProducto.appendChild(btnEliminar);

        contenedorCarritoProductos.appendChild(divProducto);
    });
};

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".producto-carrito-eliminar");
    botonesEliminar.forEach(btn => {
        btn.addEventListener("click", eliminarDelCarrito);
    });
};

function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto Eliminado",
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
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(index, 1);
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
};

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¡Se van a borrer todos tus productos!",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
          Swal.fire({
            title: "¡Eliminado!",
            text: "Tu carrito ha sido vaciado.",
            icon: "success"
          });
        }
      });
};
botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
    contenedorCarritoVacio.classList.add("ocultar");
    contenedorCarritoProductos.classList.add("ocultar");
    contenedorCarritoAcciones.classList.add("ocultar");
    contenedorCarritoComprado.classList.remove("ocultar");
};

function calcularTotal() {
    let totalParcial = 0;
    productosEnCarrito.forEach(producto => {
        totalParcial += producto.cantidad * producto.precio;
    })
    total.textContent = `$${totalParcial}`;
}



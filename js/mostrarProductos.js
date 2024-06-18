import { conexionAPI } from "./conexionAPI.js";

const lista = document.querySelector("[data-lista]");

async function eliminarProducto(id) {
    const card = document.querySelector(`[data-producto="${id}"]`);
    if (card) {
        try {
            const confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");
            if (confirmacion) {
                // Eliminar el producto de la base de datos
                await conexionAPI.eliminarProducto(id);
                // Si se elimina correctamente de la base de datos, eliminar del DOM
                card.remove();
            }

        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    }
}


function crearCard(id, nombre, precio, imagen) {
    const producto = document.createElement("div");
    producto.className = "card";
    producto.id = id; // Asignar el ID al div
    producto.innerHTML = `
        <img src="${imagen}" alt="imagen">
        <div class="nombre-producto">
            <p>${nombre}</p>
        </div>
        <div class="precio-producto">
            <p>$${precio}</p>
        </div>
        <div class="borrar-producto" data-producto="${id}">
            <button class="borrar-btn"><i class="fa fa-trash" aria-hidden="true"></i></button>
        </div>
    `;

    const botonBorrar = producto.querySelector('.borrar-btn');
    botonBorrar.addEventListener('click', () => {
        eliminarProducto(id);
    });

    return producto;
}

async function listarProductos() {
    try {
        const listaAPI = await conexionAPI.listarProductos();
        listaAPI.forEach(producto => {
            const card = crearCard(producto.id, producto.nombre, producto.precio, producto.imagen);
            lista.appendChild(card);
        });
    } catch (error) {
        console.error("Error al listar los productos:", error);
        lista.innerHTML = `<h2 class="mensaje__titulo">No fue posible cargar la lista de productos</h2>`;
    }
}

listarProductos();

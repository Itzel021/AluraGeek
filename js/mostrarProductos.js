import {conexionAPI} from "./conexionAPI.js";

const lista = document.querySelector("[data-lista]")
console.log(lista);

function crearCard(nombre, precio, imagen){
    const producto = document.createElement("div");
    producto.className="card";
    producto.innerHTML = `
                    <img src="${imagen}" alt="">
                    <div class="nombre-producto">
                        <p>${nombre}</p>
                    </div>
                    <div class="precio-producto">
                        <p>$${precio}</p>
                    </div>
                    <div class="borrar-producto">
                        <p><i class="fa fa-trash" aria-hidden="true"></i></p>
                    </div>
    `

    return producto;
}

async function listarProductos() {
    try {
        const listaAPI = await conexionAPI.listarProductos();
        console.log(listaAPI); // Verifica los datos recibidos

        listaAPI.forEach(producto => {
            const card = crearCard(producto.nombre, producto.precio, producto.imagen);
            lista.appendChild(card);
        });
    } catch{
        lista.innerHTML=`<h2 class="mensaje__titulo">No fue posible cargar la lista de videos</h2>`;
    }
}

listarProductos();
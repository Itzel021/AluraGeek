async function listarProductos(){
    //fetch es un metodo asincrono que recibe un url y retorna una promesa
    const conexion = await fetch("http://localhost:30001/productos");//Peticion GET
    const conexionConvertida = conexion.json();

    //console.log(conexionConvertida);
    return conexionConvertida
}

async function crearProducto(nombre,precio,imagen){
    const conexion= await fetch("http://localhost:3001/productos",{
    method:"POST",
    headers:{
        "Content-type":"application/json"
    },
    body:JSON.stringify({
        nombre:nombre,
        precio:precio,
        imagen:imagen
    })
    })
    if(!conexion.ok){
        throw new Error("No fue posible enviar el producto");
    }
    const conexionConvertida = await conexion.json();

    return conexionConvertida;
}

export const conexionAPI={
    listarProductos,
    crearProducto
}
//listarProductos();
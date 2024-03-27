const PUERTO = 8080;
import express from 'express';
const app = express();

import ProductManager from "./productManager.js";
const manager = new ProductManager("./src/archivoProductos.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//////////////////////////////////////
// RUTAS
// Ruta de prueba:
// app.get("/", (request, response) => {
//     response.send("Hola, probando");
// })

// Ruta /products
app.get("/products", async (request, response) => {
    const limit = request.query.limit;

    const productos = await manager.getProducts();
    if (limit) {
        response.json(productos.slice(0, limit));
    } else {
        response.json(productos);
    }
   
})
// Ruta /products/:pid
app.get("/products/:pid", async (request, response) => {
    const id = request.params.pid;

    const producto = await manager.getProductById(parseInt(id));
    if (!producto) {
        return response.json({
            error: "Producto no encontrado"
        });
    }
    response.json(producto);
})
////////////////////////////////////////
app.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
})
/////////////////////////////////////////////

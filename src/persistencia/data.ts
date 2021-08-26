import Producto from '../class/producto';
import Carrito from '../class/carrito';
import { contenido } from '../modules/app';
const fs = require('fs');
import path from 'path';
import { objToJSON } from './../modules/app';
const publicPathFileProductos = path.resolve(
  __dirname,
  './../../public/productos.json'
);

/**
 * DATOS A MANIPULAR
 */
const productos: Producto[] = []; //Array de productos
const dbIDs: number[] = []; //Array de los IDs de los productos
const lastID = { lastID: 0 }; //Ultimo ID de producto utilizado
const carritoGlobal = new Carrito(1, new Date()); // Carrito Global
const admin = true;

//Creando algunos Productos para pruebas
//Comentar para verificar el error de no existen productos.
for (let id = 1; id <= 4; id++) {
  const objDatos: Producto = contenido();
  const objProducto: Producto = new Producto(
    id,
    objDatos.timestamp,
    objDatos.nombre,
    objDatos.descripcion,
    objDatos.precio,
    objDatos.codigo,
    objDatos.url,
    objDatos.stock
  );
  productos.push(objProducto);
  dbIDs.push(id);
  lastID.lastID = id;
}

fs.writeFileSync(publicPathFileProductos, objToJSON(productos), 'utf-8');

export { productos, dbIDs, lastID, admin, carritoGlobal };

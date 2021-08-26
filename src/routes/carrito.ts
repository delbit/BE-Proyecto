import express from 'express';
import { carritoController } from '../controllers/carrito';

const routerCarrito = express.Router();

/**
 * DEFINICION RUTAS BASICAS
 */

//Ruta para Listar todos los producto existentes dentro del carrito
routerCarrito.get('/listar', carritoController.getCarrito);

//Ruta para listar un producto especifico por su id
routerCarrito.get('/listar/:id', carritoController.getCarrito);

//Ruta para guardar un producto nuevo si se cumplen los parámetros necesarios.
routerCarrito.post('/agregar/:id', carritoController.addCarrito);

// //Ruta encargada de eliminar un producto del carrito
routerCarrito.delete('/borrar/:id', carritoController.delCarrito);

export default routerCarrito;

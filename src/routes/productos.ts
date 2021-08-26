import express from 'express';
import { productsController } from '../controllers/productos';
import { checkAdmin } from './../middlewares/admin';

const router = express.Router();

/**
 * DEFINICION RUTAS BASICAS
 */

//Ruta para Listar todos los producto existentes
router.get('/listar', productsController.getProducts);

//Ruta para listar un producto especifico por su id
router.get('/listar/:id', productsController.getProducts);

//Ruta para guardar un producto nuevo si se cumplen los parámetros necesarios.
router.post('/agregar', checkAdmin, productsController.addProducts);

//Ruta para actualizar un producto si se cumplen los parámetros necesarios.
router.put('/actualizar/:id', checkAdmin, productsController.putProducts);

//Ruta encargada de eliminar un producto
router.delete('/borrar/:id', checkAdmin, productsController.delProducts);

export default router;

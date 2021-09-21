import express from 'express';
import { productsController } from '../controllers/productos';
import { checkAdmin } from './../middlewares/admin';
import asyncHandler from 'express-async-handler';

const router = express.Router();

/**
 * DEFINICION RUTAS BASICAS
 */

//Ruta para Listar todos los producto existentes
router.get('/listar', asyncHandler(productsController.getProducts));

//Ruta para listar un producto especifico por su id
router.get(
  '/listar/:id',
  productsController.checkProductExists,
  asyncHandler(productsController.getProducts)
);

//Ruta para guardar un producto nuevo si se cumplen los parámetros necesarios.
router.post('/agregar', checkAdmin, productsController.addProducts);

//Ruta para actualizar un producto si se cumplen los parámetros necesarios.
router.put(
  '/actualizar/:id',
  checkAdmin,
  productsController.checkProductExists,
  asyncHandler(productsController.updateProducts)
);

//Ruta encargada de eliminar un producto
router.delete(
  '/borrar/:id',
  checkAdmin,
  productsController.checkProductExists,
  asyncHandler(productsController.deleteProducts)
);

export default router;

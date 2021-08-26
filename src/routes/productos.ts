import express from 'express';
import { productsController } from '../controllers/productos';
import { productos, dbIDs, lastID } from '../persistencia/data';
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
router.delete('/borrar/:id', checkAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const msgErrorID = 'Producto no encontrado';
  let flagDelete = true;

  const errorGuardar = (msg: string) => {
    return res.status(400).json({
      error: msg,
    });
  };

  if (id < dbIDs[0] || id > dbIDs[dbIDs.length - 1]) {
    flagDelete = false;
    errorGuardar(msgErrorID);
  }

  let indexID = dbIDs.findIndex((ID) => ID === id);
  if (indexID === -1) {
    flagDelete = false;
    errorGuardar(msgErrorID);
  }

  if (flagDelete) {
    const product = productos[indexID];
    productos.splice(indexID, 1);
    dbIDs.splice(indexID, 1);

    res.json({
      product,
    });
  }
});

export default router;

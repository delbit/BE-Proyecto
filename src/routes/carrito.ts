import express from 'express';
import Producto from '../class/producto';
import { productos, dbIDs, lastID } from '../persistencia/data';

const routerCarrito = express.Router();

/**
 * DEFINICION RUTAS BASICAS
 */

//Ruta para Listar todos los producto existentes dentro del carrito
routerCarrito.get('/listar', (req, res) => {
  if (productos.length < 1) {
    return res.status(400).json({
      error: 'No hay productos cargados',
    });
  }

  res.json({
    productos,
  });
});

//Ruta para listar un producto especifico por su id
routerCarrito.get('/listar/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (id < dbIDs[0] || id > dbIDs[dbIDs.length - 1]) {
    return res.status(400).json({
      error: 'Producto no encontrado',
    });
  }

  const indexID = dbIDs.findIndex((ID) => ID === id);
  if (indexID === -1) {
    return res.status(400).json({
      error: 'Producto no encontrado',
    });
  }

  const product = productos[indexID];
  res.json({
    product,
  });
});

//Ruta para guardar un producto nuevo si se cumplen los parámetros necesarios.
routerCarrito.post('/agregar:id', (req, res) => {
  const body = req.body;
  const id = parseInt(req.params.id);
  const msgErrorParametros = 'Parámetros no validos';
  const errorGuardar = (msg: string) => {
    return res.status(400).json({
      error: msg,
    });
  };

  //SI el id de un producto existe se debe agregar
  if (id) {
    res.json({
      true: 'true',
    });
  }
});

//Ruta encargada de eliminar un producto del carrito
routerCarrito.delete('/borrar/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const msgErrorID = 'Producto no encontrado';
  let flagDelete = true;

  const errorGuardar = (msg: string) => {
    return res.status(400).json({
      error: msg,
    });
  };

  // se debe modificar para verificar el la DB del carrito
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

export default routerCarrito;

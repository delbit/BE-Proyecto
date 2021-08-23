import express from 'express';
import Producto from '../class/producto';
import { productos, dbIDs, lastID } from '../modules/data';

const routerProductos = express.Router();

/**
 * DEFINICION RUTAS BASICAS
 */

//Ruta para Listar todos los producto existentes
routerProductos.get('/listar', (req, res) => {
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
routerProductos.get('/listar/:id', (req, res) => {
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
routerProductos.post('/agregar', (req, res) => {
  const body = req.body;
  const msgErrorParametros = 'Parámetros no validos';
  const errorGuardar = (msg: string) => {
    return res.status(400).json({
      error: msg,
    });
  };

  if (body.title === undefined) {
    errorGuardar('title no definido');
  }

  if (body.price === undefined) {
    errorGuardar('Precio no definido');
  }

  if (isNaN(parseFloat(body.price))) {
    errorGuardar('Precio letra');
  }

  if (body.thumbnail === undefined) {
    errorGuardar('No imagen');
  }

  lastID.lastID = lastID.lastID + 1; // Se incrementa el lastID.lastID por que se va a guarda un nuevo valor.

  const objProducto = new Producto(
    lastID.lastID,
    new Date(),
    body.nombre,
    body.descripcion,
    parseFloat(body.precio),
    parseInt(body.codigo),
    body.url,
    parseInt(body.stock)
  );
  productos.push(objProducto);
  dbIDs.push(lastID.lastID);

  //Validando si el guarda es usado desde el form o via json/api
  if (body.form === 'true') {
    //Deprecated el form no se usa desde un submit, se reemplaza por websocket
    res.redirect(301, '/');
  } else {
    res.json({
      objProducto,
    });
  }
});

//Ruta para actualizar un producto si se cumplen los parámetros necesarios.
routerProductos.put('/actualizar/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const body = req.body;
  const msgErrorID = 'Producto no encontrado';
  const msgErrorParametros = 'Parámetros no validos';
  let flagUpdate = true;

  const errorGuardar = (msg: string) => {
    return res.status(400).json({
      error: msg,
    });
  };

  if (id < dbIDs[0] || id > dbIDs[dbIDs.length - 1]) {
    flagUpdate = false;
    errorGuardar(msgErrorID);
  }

  const indexID = dbIDs.findIndex((ID) => ID === id);
  if (indexID === -1) {
    flagUpdate = false;
    errorGuardar(msgErrorID);
  }

  if (body.title === undefined) {
    flagUpdate = false;
    errorGuardar(msgErrorParametros);
  }

  if (body.price === undefined) {
    flagUpdate = false;
    errorGuardar(msgErrorParametros);
  }

  if (isNaN(parseFloat(body.price))) {
    flagUpdate = false;
    errorGuardar(msgErrorParametros);
  }

  if (body.thumbnail === undefined) {
    flagUpdate = false;
    errorGuardar(msgErrorParametros);
  }

  if (flagUpdate) {
    productos[indexID].nombre = body.title;
    productos[indexID].precio = body.price;
    productos[indexID].url = body.thumbnail;
    const objProducto = productos[indexID];
    /*
     *** Recordar guardar en el archivo ***
     */
    res.json({
      objProducto,
    });
  }
});

//Ruta encargada de eliminar un producto
routerProductos.delete('/borrar/:id', (req, res) => {
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

export default routerProductos;

import { productos, dbIDs, lastID } from './data';
import Producto from '../class/producto';
const fs = require('fs');
import path from 'path';
import { objToJSON } from './../modules/app';
const publicPathFileProductos = path.resolve(
  __dirname,
  './../../public/productos.json'
);

function checkParams(data: any) {
  let checkFlag: boolean = false;

  if (data.nombre === undefined) {
    return checkFlag;
  }

  if (data.descripcion === undefined) {
    return checkFlag;
  }

  if (isNaN(parseFloat(data.precio))) {
    return checkFlag;
  }

  if (isNaN(parseInt(data.codigo))) {
    return checkFlag;
  }

  if (data.url === undefined) {
    return checkFlag;
  }

  if (isNaN(parseInt(data.stock))) {
    return checkFlag;
  }

  checkFlag = true;
  return checkFlag;
}

class Productos {
  //Se encarga de buscar un producto en particular y lo retorno si existe
  find(id: number) {
    if (id < dbIDs[0] || id > dbIDs[dbIDs.length - 1]) {
      return -1;
    }

    const indexID = dbIDs.findIndex((ID) => ID === id);
    if (indexID === -1) {
      return indexID;
    }

    return indexID;
  }

  //Retorna la lista de productos
  get(id: number = 0) {
    if (id !== 0) {
      return [productos[id]];
    }
    return productos;
  }

  post(data: any) {
    let dataOk: boolean = checkParams(data);

    if (dataOk) {
      lastID.lastID = lastID.lastID + 1; // Se incrementa el lastID.lastID por que se va a guarda un nuevo valor.
      const objProducto = new Producto(
        lastID.lastID,
        new Date(),
        data.nombre,
        data.descripcion,
        parseFloat(data.precio),
        parseInt(data.codigo),
        data.url,
        parseInt(data.stock)
      );
      productos.push(objProducto);
      dbIDs.push(lastID.lastID);

      this.guardarProductos();

      return objProducto;
    } else {
      return dataOk;
    }
  }

  put(data: any, indexID: number) {
    let dataOk: boolean = checkParams(data);

    if (dataOk) {
      productos[indexID].modificar(
        indexID,
        new Date(),
        data.nombre,
        data.descripcion,
        parseFloat(data.precio),
        parseInt(data.codigo),
        data.url,
        parseInt(data.stock)
      );
      this.guardarProductos();
      return [productos[indexID]];
    } else {
      return dataOk;
    }
  }

  del(indexID: number) {
    const producto = productos[indexID];
    productos.splice(indexID, 1);
    dbIDs.splice(indexID, 1);
    this.guardarProductos();
    return producto;
  }

  guardarProductos() {
    fs.writeFileSync(publicPathFileProductos, objToJSON(productos), 'utf-8');
  }
}

export const productsPersistencia = new Productos();

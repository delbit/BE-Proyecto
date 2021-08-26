import { leerMessages } from '../modules/app';
import Producto from '../class/producto';
import Carrito from '../class/carrito';
import Message from '../class/message';
import { contenido } from '../modules/app';

/**
 * DATOS A MANIPULAR
 */
const productos: Producto[] = []; //Array de productos
const dbIDs: number[] = []; //Array de los IDs de los productos
const lastID = { lastID: 0 }; //Ultimo ID de producto utilizado
const messages: Message[] = []; //Array de todos los mensajes del chat
const carritoGlobal = new Carrito(1, new Date());
const admin = true;

//Se verifica si existen mensajes guardados
function checkMessagesOld() {
  let messageOld = JSON.parse(leerMessages());
  if (messageOld !== -1) {
    messages.push.apply(messages, messageOld);
  }
}

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

//Se inicializan los mensajes
checkMessagesOld();
export { productos, dbIDs, lastID, messages, admin };

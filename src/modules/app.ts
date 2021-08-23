const fs = require('fs');
import path from 'path';
import Producto from '../class/producto';
const publicPathFolder = path.resolve(__dirname, './../../public/');
const publicPathFileName = path.resolve(
  __dirname,
  './../../public/messages.txt'
);

//Función para generar un numero aleatorio partiendo de un intervalo.
const random = (min: number, max: number) => {
  return Math.random() * (max - min + 1) + min;
};

//Generando el contenido de la Item.
const contenido = () => {
  let obj: Producto = new Producto(
    0,
    new Date(),
    `Producto ${Math.floor(random(1, 10))}`,
    `Descripcion ${Math.floor(random(1, 10))}`,
    parseFloat(random(0.0, 9999.99).toFixed(2)),
    parseInt(random(0, 40000).toFixed(0)),
    `https://picsum.photos/id/${Math.floor(random(1, 200))}/200/200`,
    parseInt(random(0, 100).toFixed(0))
  );
  return obj;
};

//stringify el contenido para el Item.
const objToJSON = (contenido: any) => {
  return JSON.stringify(contenido, undefined, 2);
};

//Esta funcion se encarga de leer y devolver los mensajes de existir el archivo de mensajes.
function leerMessages() {
  let filenames = fs.readdirSync(publicPathFolder);
  const found = filenames.find((element: string) => 'messages.txt' === element);
  if (found === 'messages.txt') {
    const data = fs.readFileSync(publicPathFileName, 'utf-8');
    return data;
  } else {
    return -1;
  }
}

// Esta función guarda el array de mensajes en un archivo con formato JSON
function guardarMessages(messages: any) {
  fs.writeFileSync(publicPathFileName, objToJSON(messages), 'utf-8');
}

export { random, contenido, objToJSON, leerMessages, guardarMessages };

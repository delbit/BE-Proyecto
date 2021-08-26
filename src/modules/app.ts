import Producto from '../class/producto';

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

export { random, contenido, objToJSON };

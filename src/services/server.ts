import express from 'express';
import path from 'path';
import * as http from 'http';
import apiRouter from './../routes/index';

//Creando el servicio de express
export const app = express();

//Iniciando la carpeta public
const publicPath = path.resolve(__dirname, './../../public');
app.use(express.static(publicPath));

// Módulos usados para aceptar el método post con JSON o urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Definiendo las rutas
app.use('/', apiRouter);

/**
 * INICIALIZACION DEL SERVER y SERVICIOS
 */
//Creando el objeto http ára usar websocket
const myServer = new http.Server(app);

export default myServer;

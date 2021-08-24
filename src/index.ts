import Server from './services/server';

/** Configuración para EXPRESS */
const puerto = process.env.PORT || 8080;

//El server se inicia escuchando
Server.listen(puerto, () => console.log('Server up en puerto', puerto));

import path from 'path';
import handlebars from 'express-handlebars';

/** Configurando Handlebars */
//Estableciendo los path de los views para Handlebars
const layoutDirPath = path.resolve(__dirname, './../../views/layouts');
const defaultLayerPth = path.resolve(
  __dirname,
  './../../views/layouts/index.hbs'
);
const partialDirPath = path.resolve(__dirname, './../../views/partials');

//Configurando el engine con Handlerbars y los path personalizados
export function handlebarsConfig(app: any) {
  app.set('view engine', 'hbs');
  app.engine(
    'hbs',
    handlebars({
      layoutsDir: layoutDirPath,
      extname: 'hbs',
      defaultLayout: defaultLayerPth,
      partialsDir: partialDirPath,
    })
  );
}

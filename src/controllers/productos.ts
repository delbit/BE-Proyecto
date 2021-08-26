import { Request, Response, NextFunction } from 'express';
import { productsPersistencia } from '../persistencia/productos';

class Producto {
  //Para obtener los productos
  getProducts(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (id) {
      const producto = productsPersistencia.find(id);
      console.log(producto);

      if (!producto) {
        return res.status(404).json({
          msg: 'Producto no encontrado',
        });
      }

      return res.json({
        data: producto,
      });
    } else {
      const productos = productsPersistencia.get();

      if (productos.length < 1) {
        return res.status(400).json({
          error: 'No hay productos cargados',
        });
      }

      res.json({
        productos,
      });
    }
  }

  addProducts(req: Request, res: Response) {
    const body = req.body;
    const producto = productsPersistencia.post(body);

    if (!producto) {
      return res.status(400).json({
        msg: 'Parametros no validos',
      });
    } else {
      res.json({
        producto,
      });
    }
  }
}

export const productsController = new Producto();

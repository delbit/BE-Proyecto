import { Request, Response } from 'express';
import { productsPersistencia } from '../persistencia/productos';

class Producto {
  //Para obtener los productos
  getProducts(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (id) {
      const index = productsPersistencia.find(id);

      if (index === -1) {
        return res.status(404).json({
          msg: 'Producto no encontrado',
        });
      }

      return res.json({
        data: productsPersistencia.get(index),
      });
    } else {
      const productos = productsPersistencia.get();

      if (productos.length < 1) {
        return res.status(400).json({
          error: 'No hay productos cargados',
        });
      }

      res.json({
        data: productos,
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
        data: producto,
      });
    }
  }

  putProducts(req: Request, res: Response) {
    const body = req.body;
    const id = Number(req.params.id);

    if (id) {
      const index = productsPersistencia.find(id);

      if (index === -1) {
        return res.status(404).json({
          msg: 'Producto no encontrado',
        });
      }

      const producto = productsPersistencia.put(body, index);

      if (!producto) {
        return res.status(400).json({
          msg: 'Parametros no validos',
        });
      } else {
        res.json({
          data: producto,
        });
      }
    }
  }

  delProducts(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (id) {
      const index = productsPersistencia.find(id);

      if (index === -1) {
        return res.status(404).json({
          msg: 'Producto no encontrado',
        });
      }

      const producto = productsPersistencia.del(index);

      res.json({
        data: producto,
      });
    }
  }
}

export const productsController = new Producto();

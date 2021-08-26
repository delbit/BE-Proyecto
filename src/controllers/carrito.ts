import { Request, Response } from 'express';
import { carritoPersistencia } from '../persistencia/carrito';
import { productsPersistencia } from '../persistencia/productos';

class Carrito {
  //Para obtener los productos
  getCarrito(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (id) {
      const index = carritoPersistencia.find(id);

      if (index === -1) {
        return res.status(404).json({
          msg: 'Producto no encontrado',
        });
      }

      return res.json({
        data: carritoPersistencia.get(index),
      });
    } else {
      const carrito = carritoPersistencia.get();

      if (carrito.productos.length < 1) {
        return res.status(400).json({
          error: 'No hay productos cargados en el carrito',
        });
      }

      res.json({
        data: carrito,
      });
    }
  }

  addCarrito(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (id) {
      const existe = carritoPersistencia.find(id);
      if (existe !== -1) {
        return res.status(404).json({
          msg: 'Producto ya en el carrito',
        });
      }

      const index = productsPersistencia.find(id);

      if (index === -1) {
        return res.status(404).json({
          msg: 'Producto no encontrado',
        });
      }

      return res.json({
        data: carritoPersistencia.post(index),
      });
    }
  }

  delCarrito(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (id) {
      const index = carritoPersistencia.find(id);

      if (index === -1) {
        return res.status(404).json({
          msg: 'Producto no encontrado',
        });
      }

      return res.json({
        data: carritoPersistencia.del(index),
      });
    }
  }
}

export const carritoController = new Carrito();

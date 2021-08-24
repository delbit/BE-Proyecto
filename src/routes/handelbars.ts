import { Router } from 'express';
import { productos } from './../modules/data';

const router = Router();

// Render de la pagina vista
router.get('/', (req, res) => {
  const data = { mostrarForm: true, mostrarList: true, productos };
  res.render('main', data);
});

// Render de la pagina vista
router.get('/productos/vista', (req, res) => {
  const data = { mostrarVista: true, productos };
  res.render('main', data);
});

export default router;

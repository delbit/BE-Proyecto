import { Router } from 'express';
import productsRouter from './productos';
//import cartRouter from './carrito';

const router = Router();

router.use('/productos', productsRouter);

export default router;

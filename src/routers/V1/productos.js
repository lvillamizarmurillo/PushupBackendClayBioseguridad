import { Router } from "express";
import { validate } from '../../validation/validaciones.js';
import Producto from "../../services/productos.js";
import routesVersioning from 'express-routes-versioning';
import passporthelpert from '../../config/passporthelpert.js';


const router = Router();
const version = routesVersioning();

router.use(passporthelpert.authenticate('bearer', {session: false}));

router.get('/', version({'1.0.0': validate(Producto.getProductoTallaColor)}));

export {
    router
}
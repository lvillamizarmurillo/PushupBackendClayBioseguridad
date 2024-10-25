import { Router } from "express";
import { validate } from '../../validation/validaciones.js';
import Venta from "../../services/ventas.js";
import routesVersioning from 'express-routes-versioning';
import passporthelpert from '../../config/passporthelpert.js';


const router = Router();
const version = routesVersioning();

router.use(passporthelpert.authenticate('bearer', {session: false}));

router.get('/', version({'1.0.0': validate(Venta.getVentasJulio),'1.0.1': validate(Venta.getVentaClienteMetodoPago)}));

router.post('/', version({'1.0.0': validate(Venta.postFechaVentas)}));

export {
    router
}
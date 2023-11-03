import { Router } from "express";
import { validate } from '../../validation/validaciones.js';
import Empleado from "../../services/empleados.js";
import routesVersioning from 'express-routes-versioning';
import passporthelpert from '../../config/passporthelpert.js';


const router = Router();
const version = routesVersioning();


router.use(passporthelpert.authenticate('bearer', {session: false}));

router.get('/', version({'1.0.0': validate(Empleado.getEmpleadosCargoMunicipio)}))

export {
    router
}
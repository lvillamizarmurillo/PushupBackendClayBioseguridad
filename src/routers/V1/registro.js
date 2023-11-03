import { Router } from "express";
import routesVersioning from "express-routes-versioning";
import Usuarios from '../../services/usuario.js';
import { validate } from '../../validation/validaciones.js'

const router = Router();
const version = routesVersioning();

router.post('/', version({'1.0.0': validate(Usuarios.postUsuarios)}))

export {
    router
}
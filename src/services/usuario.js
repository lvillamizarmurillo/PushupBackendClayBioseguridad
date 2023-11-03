import db from '../config/dbconnect.js'
import { validationResult } from 'express-validator';
import { DTO } from '../middleware/controllers/registro.js';

const usuario = await db.getconnection().nombreTabla('usuario').conectar();

export default class Usuario{
    static async postUsuarios(req,res){
        if(!req.rateLimit) return;
        await Promise.all(DTO[`${req.headers["accept-version"]}`].map(res => res.run(req)));
        const {errors} = validationResult(req);
        if (errors.length) return res.status(400).json({ errors });
        await usuario.insertOne(req.body);
        res.status(200).send({status: 200, message: "Usuario registrado con exito"});
    }
}
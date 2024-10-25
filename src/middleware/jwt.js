import dotenv from 'dotenv/config'
import { jwtVerify, SignJWT } from 'jose';
import { validationResult } from 'express-validator';
import db from '../config/dbconnect.js';
import { ObjectId } from 'mongodb';
import { DTO } from './controllers/registro.js';

const env = process.env.JWT;

const usuario = await db.getconnection().nombreTabla('usuario').conectar();

const crearToken = async(req,res,next)=>{
    if(!req.rateLimit) return;
    await Promise.all(DTO[`${req.headers["accept-version"]}`].map(res => res.run(req)));
    const {errors} = validationResult(req);
    if (errors.length) return res.status(400).json({ errors });
    const encoder = new TextEncoder();
    const result = await usuario.findOne({email: req.body.email, password: req.body.password})
    if(!result) return res.status(401).send({status:401,message:'Usuario no encontrado'})
    const id = result._id.toString();
    const jwtEncriptado = await new SignJWT({id: id})
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('3h')
        .sign(encoder.encode(env));
    req.data = {status:200,message:jwtEncriptado};
    next()
}
const verificarToken = async(token)=>{
    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            token,
            encoder.encode(env)
        )
        return usuario.findOne({_id: new ObjectId(jwtData.payload.id)})
    } catch (error) {
        return false;
    }
}

export {
    crearToken,
    verificarToken
}
import db from "../config/dbconnect.js";
import { validationResult } from 'express-validator';
import { DTO } from '../middleware/controllers/fecha.js';

const venta = await db.getconnection().nombreTabla('venta').conectar();

export default class Venta{
    static async getVentasJulio(req,res){
        if(!req.rateLimit) return;
        const data = await venta.aggregate([
            {
                $match: {Fecha: {$gte: '2023-07-00'},Fecha: {$lte: '2023-07-31'}}
            }
        ]).toArray();
        res.status(200).send({status:200,message: data})
    }
    static async getVentaClienteMetodoPago(req,res){
        if(!req.rateLimit) return;
        const data = await venta.aggregate([
            {
                $match: {}
            },
            {
                $lookup: {
                    from: 'cliente',
                    localField: 'IdClienteFk',
                    foreignField: '_id',
                    as: 'infoCliente'
                }
            },
            {
                $lookup: {
                    from: 'forma_pago',
                    localField: 'IdFormaPagoFk',
                    foreignField: '_id',
                    as: 'formaPago'
                }
            }
        ]).toArray();
        res.status(200).send({status:200,message: data})
    }
    static async postFechaVentas(req,res){
        if(!req.rateLimit) return;
        await Promise.all(DTO[`1.0.0`].map(res => res.run(req)));
        const {errors} = validationResult(req);
        if (errors.length) return res.status(400).json({ errors });
        const data = await venta.aggregate([
            {
                $match: {Fecha: {$gte: req.body.fecha_inicio},Fecha: {$lte: req.body.fecha_final}}
            },
            {
                $lookup: {
                    from: 'cliente',
                    localField: 'IdClienteFk',
                    foreignField: '_id',
                    as: 'infoCliente'
                }
            },
            {
                $project: {
                    _id: 0,
                    ['infoCliente.nombre']: 1,
                    cantidadArticulosComprados: "1"
                }
            }
        ]).toArray();
        res.status(200).send({status:200,message: data})
    }
}
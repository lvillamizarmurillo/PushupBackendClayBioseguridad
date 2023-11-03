import db from "../config/dbconnect.js"

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
}
import db from "../config/dbconnect.js"

const inventario = await db.getconnection().nombreTabla('inventario').conectar();

export default class Producto{
    static async getProductoTallaColor(req,res){
        if(!req.rateLimit) return;
        const data = await inventario.aggregate([
            {
                $match: {}
            },
            {
                $lookup: {
                    from: 'inventario_talla',
                    localField: '_id',
                    foreignField: 'IdInvFk',
                    as: 'llaveTalla',
                }
            },
            {
                $lookup: {
                    from: 'talla',
                    localField: 'llaveTalla.IdInvFk',
                    foreignField: '_id',
                    as: 'talla'
                }
            },
            {
                $lookup: {
                    from: 'prenda',
                    localField: 'IdPrendaFk',
                    foreignField: '_id',
                    as: 'prenda',
                }
            },
            {
                $lookup: {
                    from: 'detalle_orden',
                    localField: 'prenda._id',
                    foreignField: 'PrendaId',
                    as: 'detalle_orden'
                }
            },
            {
                $lookup: {
                    from: 'color',
                    localField: 'detalle_orden.PrendaId',
                    foreignField: '_id',
                    as: 'color'
                }
            },
            {
                $project:{
                    _id: 0,
                    llaveTalla: 0,
                    prenda: 0,
                    detalle_orden: 0
                }
            }
        ]).toArray();
        res.status(200).send({status:200,message: data})
    }
}
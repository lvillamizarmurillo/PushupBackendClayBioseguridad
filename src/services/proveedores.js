import db from "../config/dbconnect.js"

const proveedor = await db.getconnection().nombreTabla('proveedor').conectar();

export default class Proveedor{
    static async getProveedorInsumos(req,res){
        if(!req.rateLimit) return;
        const data = await proveedor.aggregate([
            {
                $match: {}
            },
            {
                $lookup: {
                    from: 'insumo_proveedor',
                    localField: '_id',
                    foreignField: 'IdProveedorFk',
                    as: 'insumo_pr'
                }
            },
            {
                $lookup: {
                    from: 'insumo',
                    localField: 'insumo_pr.IdInsumoFk',
                    foreignField: '_id',
                    as: 'insumoSumin'
                }
            },
            {
                $project:{
                    _id: 0,
                    insumo_pr: 0
                }
            }
        ]).toArray();
        res.status(200).send({status:200,message: data})
    }
}
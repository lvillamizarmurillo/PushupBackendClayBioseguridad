import db from "../config/dbconnect.js"

const empleado = await db.getconnection().nombreTabla('empleado').conectar();

export default class Empleado{
    static async getEmpleadosCargoMunicipio(req,res){
        if(!req.rateLimit) return;
        const data = await empleado.aggregate([
            {
                $match: {}
            },
            {
                $lookup: {
                    from: 'cargos',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'cargo'
                }
            },
            {
                $lookup: {
                    from: 'municipio',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'municipio'
                }
            }
        ]).toArray();
        res.status(200).send({status:200,message: data})
    }
}
import db from "../config/dbconnect.js"

const orden = await db.getconnection().nombreTabla('orden').conectar();

export default class Ordenes{
    static async getDetalleOrdenEmpleadoCliente(req,res){
        if(!req.rateLimit) return;
        const data = await orden.aggregate([
            {
                $match: {}
            },
            {
                $lookup: {
                    from: 'empleado',
                    localField: 'IdEmpleadoFk',
                    foreignField: '_id',
                    as: 'infoEmpleado'
                }
            },
            {
                $lookup: {
                    from: 'cliente',
                    localField: 'IdClienteFk',
                    foreignField: '_id',
                    as: 'infoCliente'
                }
            }
        ]).toArray();
        res.status(200).send({status:200,message: data})
    }
}
import db from "../config/dbconnect.js"

const orden = await db.getconnection().nombreTabla('orden').conectar();
const estado = await db.getconnection().nombreTabla('estado').conectar();

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
    static async getOrdenEnProceso(req,res){
        if(!req.rateLimit) return;
        const data = await estado.aggregate([
            {
                $match: {descripcion: "Pendiente"}
            },
            {
                $lookup: {
                    from: 'orden',
                    localField: '_id',
                    foreignField: 'IdEstadoFk',
                    as: 'orden'
                }
            },
            {
                $lookup: {
                    from: 'empleado',
                    localField: 'orden.IdEmpleadoFk',
                    foreignField: '_id',
                    as: 'infoEmpleado'
                }
            },
            {
                $lookup: {
                    from: 'cliente',
                    localField: 'orden.IdClienteFk',
                    foreignField: '_id',
                    as: 'infoCliente'
                }
            }
        ]).toArray();
        res.status(200).send({status:200,message: data})
    }
}
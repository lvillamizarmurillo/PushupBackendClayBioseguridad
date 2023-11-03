import db from "../config/dbconnect.js"

const empresa = await db.getconnection().nombreTabla('empresa').conectar();

export default class Empresa{
    static async getEmpresaMunicipio(req,res){
        if(!req.rateLimit) return;
        const data = await empresa.aggregate([
            {
                $match: {}
            },
            {
                $lookup: {
                    from: 'municipio',
                    localField: 'IdMunicipioFk',
                    foreignField: '_id',
                    as: 'municipio'
                }
            },
            {
                $project: {
                    razon_social: 1,
                    representante_legal: 1,
                    municipio: 1
                }
            }
        ]).toArray();
        res.status(200).send({status:200,message: data})
    }
}
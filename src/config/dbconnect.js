import { MongoClient } from "mongodb";
import dotenv from 'dotenv/config'

export default class Connect{
    static instancia;
    dbMongo = new MongoClient(process.env.MONGO_URI);
    dbnombre = 'usuario';
    dbcoleccion = 'producion';
    db;

    static getconnection(){
        if(Connect.instancia instanceof Connect) return Connect.instancia;
        Connect.instancia = new Connect;
        return Connect.instancia;
    }

    nombreTabla(nombre){
        this.dbnombre = nombre
        return Connect.instancia;
    }

    conectar(){
        this.db = this.dbMongo.db(this.dbcoleccion).collection(this.dbnombre)
        return this.db
    }
}
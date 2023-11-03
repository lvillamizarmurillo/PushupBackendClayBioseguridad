import express from 'express';
import rateLimit from './src/config/ratelimit.js';
import routerDinamico from './src/routers/index.js';
import dotenv from 'dotenv/config';

const app = express();
const config = JSON.parse(process.env.MY_SERVER);
    
app
    .use(rateLimit)

    .use(express.json())

    .use(async(req,res,next)=>{
        try {
            app.use('/clay', await routerDinamico(req.header('Accept-version')));
        } catch (error) {
            res.status(400).send({status: 400,message: 'Es necesario poner en los headers la version a utilizar.'});
        }
        next();
    })

    .listen(config, ()=>{
        console.log(`http://${config.hostname}:${config.port}`);
    });
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server{
    constructor(){
        this.app = express();
        this. port = process.env.PORT;
        this.path = '/';

        // Conectando a la Base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        // this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Servir el contenido del directorio 'public/  '
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use( this.path, require() );
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Server listening at port ', this.port);
        });
    }
}

module.exports = Server;
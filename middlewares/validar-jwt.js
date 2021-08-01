const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async( req = request, res = response, next ) => {
    // Lectura de headers debe ser llamada igual que la enviada por el front
    const token = req.header('x-token');

    if( !token ){
        res.status(401).json({
            msg: 'Token es necesario'
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRET_PRIVATE_KEY );
        const usuario = await Usuario.findById( uid );
        // Almacenando en la request el usuario
        req.usuario = usuario;

        if( !usuario )
            return res.status(401).json({
                msg: "Usuario no registrado"
            });

        if( !usuario.status )
            return res.status(401).json({
                msg: "Usuario no está disponible"
            });

        next()
    } catch (error) {
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
}

module.exports = {
    validarJWT
}
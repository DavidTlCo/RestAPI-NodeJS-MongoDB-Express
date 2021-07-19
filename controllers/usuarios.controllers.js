const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuarioGet = ( req = request, res = response) => {
    res.json({
        msg: 'usuario get'
    });
}

const usuarioPost = async( req = request, res = response ) => {
    const { name, email, password, role } = req.body
    const usuario = new Usuario({ name, email, password, role });

    // Verify if email exists
    

    // Encriptying password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);
    
    // Saving register in DB Mongoose
    // Important send all atributes required
    await usuario.save();

    res.json({
        usuario
    });
}

const usuarioPut = ( req =request, res = response ) => {
    res.json({
        msg: 'usuario Put'
    });
} 

module.exports = {
    usuarioGet, 
    usuarioPost,
    usuarioPut
}
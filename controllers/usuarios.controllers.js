const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuarioGet = async( req = request, res = response) => {
    const { from = 0, limit = 20 } = req.query;

    // Register which have status true
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        // Count all register
        Usuario.countDocuments(),

        // Get register
        Usuario.find()
        .skip(Number(from))
        .limit(Number(limit))
    ])

    // const usuarios = await Usuario.find(query)
    //     .skip(Number(from))
    //     .limit(Number(limit));

    res.json({
        total,
        usuarios
    });
}

const usuarioPost = async( req = request, res = response ) => {
    const { name, email, password, role } = req.body
    const usuario = new Usuario({ name, email, password, role });

    // Encriptying password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);
    
    // Saving register in DB Mongoose
    // Important send all atributes required
    await usuario.save();

    res.json({
        mgs: 'Usuario creado exitosamente',
        usuario
    });
}

const usuarioPut = async( req =request, res = response ) => {
    const id = req.params.id;
    const { password, google, email, ...rest } = req.body;
    
    // If password is recived
    if( password ){
        // Encriptying password
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt);
    }
    
    // Update info
    const user = await Usuario.findByIdAndUpdate( id, rest );

    res.json({
        msg: 'Información actualizada con éxito',
        usuario: `${rest.name}`
    });
} 


module.exports = {
    usuarioGet, 
    usuarioPost,
    usuarioPut
}
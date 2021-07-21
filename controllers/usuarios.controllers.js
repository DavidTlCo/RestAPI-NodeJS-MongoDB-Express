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
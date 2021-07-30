const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarToken } = require('../helpers/genarator-jwt');


const login = async( req, res = response ) => {
    const { email, password } = req.body;

    try {
        // Verificar si existe el email
        const usuario = await Usuario.findOne({ email });
        if( !usuario ){
            return res.status(400).json({
                msg: "Correo no registrado"
            });
        }

        // Verificar si el usuario está activo
        if( !usuario.status ){
            return res.status(400).json({
                msg: "Usuario no está activo"
            });
        }

        // Verificar si la contraseña es válida
        const contraseniaValida = bcryptjs.compareSync(password, usuario.password);
        if( !contraseniaValida ){
            return res.status(400).json({
                msg: "Contraseña incorrecta"
            });
        }

        // Generar el JWT
        const token = await generarToken( usuario.id );

        res.json({
            usuario,
            token,
            msg: 'Usuario autenticado con éxito'
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "Consulte al admin de la aplicación"
        })
    }
}

module.exports = {
    login
}
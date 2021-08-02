const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarToken } = require('../helpers/genarator-jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async( req, res = response ) => {
    const { email, password } = req.body;

    try {
        // Verificar si existe el email
        const usuario = await Usuario.findOne({ email });
        if( !usuario ){
            return res.status(400).json({
                msg: "Login - Correo no registrado"
            });
        }

        // Verificar si el usuario está activo
        if( !usuario.status ){
            return res.status(400).json({
                msg: "Login - Usuario no está activo"
            });
        }

        // Verificar si la contraseña es válida
        const contraseniaValida = bcryptjs.compareSync(password, usuario.password);
        if( !contraseniaValida ){
            return res.status(400).json({
                msg: "Login - Contraseña incorrecta"
            });
        }

        // Generar el JWT
        const token = await generarToken( usuario.id );
        
        res.json({
            usuario,
            token,
            msg: 'Login - Usuario autenticado con éxito'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Login - Consulte al admin de la aplicación"
        })
    }
}

const googleSignIn = async( req, res = response ) => {
    const { id_token } = req.body;
    
    try {
        const { name, email, img } = await googleVerify( id_token );
        
        let usuario = await Usuario.findOne({ email });
        if( !usuario ){
            const data = {
                name,
                email,
                password: ':3',
                img,
                google: true,
            }
            
            usuario = new Usuario( data );
            await usuario.save();
        }
        
        // if( !usuario.status ){
        //     return res.status(401).json({
        //         msg: "Google signIn - Hable con el admin, usuario bloqueado"
        //     });
        // }
        // Generar el JWT
        const token = await generarToken( usuario.id );

        res.json({
            usuario,
            token,
            msg: "Google singIn - Inicio de sesión correcto"
        });
    } catch (error) {
        res.status(400).json({
            msg: "Token Google no válido"
        });
    }
}

module.exports = {
    login,
    googleSignIn
}
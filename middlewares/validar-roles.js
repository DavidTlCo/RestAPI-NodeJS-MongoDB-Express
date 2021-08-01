const { response } = require("express");

const esAdmin = ( req, res = response, next ) => {
    if( !req.usuario ){
        res.status(500).json({
            msg: "Se debe validar el token primero"
        });
    }

    const { name, role } = req.usuario;
    if( role != 'ADMIN_ROLE' ){
        res.status(400).json({
            msg: `${ name } no es administrador`
        })
    }
    next();
}

module.exports = {
    esAdmin
}
const { response } = require("express");

const esAdmin = ( req, res = response, next ) => {
    if( !req.usuario ){
        res.status(500).json({
            msg: "Se debe validar el token primero"
        });
    }

    const { name, role } = req.usuario;
    if( role !== 'ADMIN_ROLE' ){
        res.status(400).json({
            msg: `${ name } no es administrador`
        })
    }
    next();
}

const validarRole = ( ...roles ) => {
    return ( req, res = response, next ) => {
        if( !req.usuario ){
            res.status(500).json({
                msg: "Se debe validar el token primero"
            });
        }
        if( !roles.includes( req.usuario.role ) ){
            res.status(401).json({
                msg: `Validar role - ${ req.usuario.name } debe tener alguno de los siguientes roles: ${ roles }`
            })
        }
        next();
    }
}

module.exports = {
    esAdmin,
    validarRole
}
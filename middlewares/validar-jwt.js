const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req = request, res = response, next ) => {
    // Lectura de headers debe ser llamada igual que la enviada por el front
    const token = req.header('x-token');

    if( !token ){
        res.status(401).json({
            msg: 'Token es necesario'
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRET_PRIVATE_KEY );
        req.uid = uid;
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
const jwt = require('jsonwebtoken');

const generarToken = ( uid = '' ) => {
    return new Promise( ( resolve, reject ) => {
        // Información a guardar el payload del token
        const payload = { uid };

        // Generando la firma del token
        jwt.sign( payload, process.env.SECRET_PRIVATE_KEY, {
            expiresIn: '6h'
        }, ( err, token ) => {
            if( err ){
                console.log( err );
                reject( 'Error al generar el token' );
            }else{
                // console.log( token );
                resolve( token );
            }
        });
    });
}

module.exports = {
    generarToken
}
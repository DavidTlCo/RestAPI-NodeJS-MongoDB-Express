
const Role  = require('../models/role');
const Usuario = require('../models/usuario');

const validateRole = async(role = '') => {
    const existRole = await Role.findOne({ role });
    if( !existRole ){
        throw new Error(`El rol ${role} no está definido en la DB`);
    }
}

const existEmail = async( email ) => {
    const existEmail = await Usuario.findOne({ email });
    if( existEmail )
        throw new Error(`El correo ${ email } ya está registrado`);
}

module.exports = {
    validateRole,
    existEmail
}
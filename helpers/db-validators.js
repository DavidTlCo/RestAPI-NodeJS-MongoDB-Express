
const Role  = require('../models/role');
const usuario = require('../models/usuario');
const Usuario = require('../models/usuario');

const existName = async( name = '' ) => {
    const exist = await Usuario.findOne({ name });
    if( exist )
        throw new Error(`El usuario ${ name } ya existe`);
}

const existEmail = async( email = '' ) => {
    const exist = await Usuario.findOne({ email });
    if( exist )
        throw new Error(`El correo ${ email } ya está registrado`);
}

const validateRole = async(role = '') => {
    const exist = await Role.findOne({ role });
    if( !exist ){
        throw new Error(`El rol ${role} no está definido en la DB`);
    }
}

const existId = async( id = '' ) => {
    const exist = await Usuario.findById( id );
    if( !exist )
        throw new Error(`El id ${ id } no existe`);
    }
    
const deleteUser = async( id = '' ) => {
    const user = await Usuario.findById( id );
    const exist = user.status; 

    if( !exist )
        throw new Error(`El id ${ id } no está disponible`);
}

module.exports = {
    existName,
    existEmail,
    validateRole,
    existId,
    deleteUser
}
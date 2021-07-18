
const Role  = require('../models/role');

const roleValidate = async(role = '') => {
    const existRole = await Role.findOne({ role });
    if( !existRole ){
        throw new Error(`El rol ${role} no está definido en la DB`);
    }
}

module.exports = {
    roleValidate
}
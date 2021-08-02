const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Sobreescribiendo el método toJSON para mostrar la información del usuario
UsuarioSchema.methods.toJSON = function(){
    // Desestructurando los campos delicados 
    const { __v, password, _id, ...usuario } = this.toObject();
    // Cambiando visualmente _id por uid
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);
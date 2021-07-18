const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { usuarioPost, usuarioGet, usuarioPut } = require('../controllers/usuarios.controllers');
const { validarCampos } = require('../middlewares/validar-campos');
const Role  = require('../models/role');

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Correo no válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    // check('role', 'Rol no definido').isIn(['ADMIN_ROLE', 'USER_ROLE']), // Validate  from Schema Usuario, all is in local
    // custom validate from DB
    check('role').custom( async(role = '') => {
        const existRole = await Role.findOne({ role });
        if( !existRole ){
            throw new Error(`El rol ${role} no está definido en la DB`);
        }
    }),
    validarCampos
], usuarioPost);

router.get('/', usuarioGet);

router.put('/', usuarioPut);

module.exports = router;
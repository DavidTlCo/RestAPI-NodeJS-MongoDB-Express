const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validateRole, existEmail, existId, existName, deleteUser } = require('../helpers/db-validators');

const { usuarioPost, usuarioGet, usuarioPut, usuarioDelete } = require('../controllers/usuarios.controllers');

router.get('/', usuarioGet);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name').custom( existName ),
    check('email', 'Correo no válido').isEmail(),
    check('email').custom( existEmail ),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    // check('role', 'Rol no definido').isIn(['ADMIN_ROLE', 'USER_ROLE']), // Validate  from Schema Usuario, all is in local
    // custom validate from DB
    // check('role').custom( (role) => roleValidate(role) ), same that
    check('role').custom( validateRole ),
    validarCampos
], usuarioPost);


router.put('/:id', [
    check('id', 'El id no existe en la Base de datos').isMongoId(),
    check('id').custom( existId ),
    check('role').custom( validateRole ),
    validarCampos
], usuarioPut);


router.delete('/:id', [
    validarJWT,
    check('id', 'El id no existe en la Base de datos').isMongoId(),
    check('id').custom( existId ),
    check('id').custom( deleteUser ),
    validarCampos
], usuarioDelete);

module.exports = router;
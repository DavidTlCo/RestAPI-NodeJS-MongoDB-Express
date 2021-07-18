const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');


const { usuarioPost, usuarioGet, usuarioPut } = require('../controllers/usuarios.controllers');

router.post('/', [
    check('email', 'Correo no válido').isEmail(),
], usuarioPost);

router.get('/', usuarioGet);

router.put('/', usuarioPut);

module.exports = router;
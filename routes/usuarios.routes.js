const { Router } = require('express');
const router = Router();

const { usuarioPost, usuarioGet, usuarioPut } = require('../controllers/usuarios.controllers');

router.post('/', usuarioPost);

router.get('/', usuarioGet);

router.put('/', usuarioPut);

module.exports = router;
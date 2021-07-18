const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
    // Verify not errors in middlewares before invoque this method 
    const errors = validationResult(req);
    if( !errors.isEmpty() )
        return res.status(400).json(errors);
        
    // Si todo sale bien, se ejecuta el siguiente middleware
    next();
}

module.exports = {
    validarCampos
}
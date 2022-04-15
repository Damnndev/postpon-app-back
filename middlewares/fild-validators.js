
const { response } = require('express');
const { validationResult } = require('express-validator');

const fildValidate = (req, res = response, next) => {

   // manejamos los errores
  const errors = validationResult(req);

  // si hay errores en los campos al crear usuario
  if(!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    });
  }
  next();
}


module.exports = {
  fildValidate,
}
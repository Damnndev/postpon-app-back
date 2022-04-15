
/*
  Rutas de Usuarios / Auth

  host + /api/auth
*/

// cargamos la librería express y configuramos el router
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

// importamos nuestra funcion para crear usuario
const { createUser, loginUser, renewToken } = require('../controllers/auth');

// importamos nuestro middleware para validar campos
const { fildValidate } = require('../middlewares/fild-validators');
const { validateJWT } = require('../middlewares/validar-jwt');


/* Definimos las rutas */

// posteo a /new
router.post(
  '/new',
  [
    // colección de middlewares
    check('name', 'El nombre es un campo requerido').not().isEmpty(),
    check('email', 'El email es un campo requerido').isEmail(),
    check('password', 'El password es un campo requerido con más de 6 caracteres').isLength({ min: 6 }),
    fildValidate
  ],
  createUser);

// posteo al /auth
router.post(
  '/',
  [
    check('email', 'El email es un campo requerido').isEmail(),
    check('password', 'El password es un campo requerido con más de 6 caracteres').isLength({ min: 6 }),
    fildValidate
  ],
  loginUser);

// get renew para actualizar el JWT y verificar si el JWT es el correcto
router.get(
  '/renew',
  [
    validateJWT
  ],
  renewToken);




module.exports = router;
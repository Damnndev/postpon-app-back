// CRUD(create, read, update, delete)

/*
  Rutas de Events

  host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { fildValidate } = require('../middlewares/fild-validators');
// const { isDate } = require('../helpers/isDate');
const { validateJWT } = require('../middlewares/validar-jwt');
const { getEvent, createEvent, updateEvent, deleteEvent} = require('../controllers/events');

const router = Router();

// Se debe validar el token en cada una
router.use(validateJWT);

// Obtener eventos
router.get('/', getEvent);

// Crear eventos
router.post(
  '/',
  [
    check('title', 'Título requerido').not().isEmpty(),
    check('start', 'Fecha de inicio requerida').isDate(),
    check('end', 'Fecha de finalización requerida').isDate(),
    fildValidate
  ],
  createEvent
);

// Actualizar eventos
router.put(
  '/:id',
   [
    check('title', 'Título requerido').not().isEmpty(),
    check('start', 'Fecha de inicio requerida').isDate(),
    check('end', 'Fecha de finalización requerida').isDate(),
    fildValidate
  ],
  updateEvent
);

// Eliminar eventos
router.delete('/:id', deleteEvent);



module.exports = router;
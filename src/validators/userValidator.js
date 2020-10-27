const { check } = require('express-validator');
const fieldValidator = require('../middlewares/fieldValidator');

const updateValidator = [
  check('name', 'Debe ingresar un nombre valido.').not().isEmpty(),
  check('email', 'Debe ingresar un email valido.').isEmail(),
  check('password')
    .isLength({ min: 5 })
    .withMessage('Debe enviar una contraseña de al menos 5 caracteres')
    .matches(/\d/)
    .withMessage('La contraseña debe contener un numero'),
  check('newPassword')
    .isLength({ min: 5 })
    .withMessage('Debe enviar una contraseña de al menos 5 caracteres')
    .matches(/\d/)
    .withMessage('La contraseña debe contener un numero'),
  fieldValidator,
];

module.exports = { updateValidator };

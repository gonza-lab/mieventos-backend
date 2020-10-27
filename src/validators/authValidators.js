const { check } = require('express-validator');
const fieldValidator = require('../middlewares/fieldValidator');

const registerValidator = [
  check('email', 'Debe enviar un email válido.').isEmail(),
  check('name', 'Debe enviar un nombre de al menos 5 caracteres.').isLength({
    min: 5,
  }),
  check('password')
    .isLength({ min: 5 })
    .withMessage('Debe enviar una contraseña de al menos 5 caracteres')
    .matches(/\d/)
    .withMessage('La contraseña debe contener un numero'),
  fieldValidator,
];

const loginValidator = [
  check('email', 'Debe enviar un email válido.').isEmail(),
  check('password')
    .isLength({ min: 5 })
    .withMessage('Debe enviar una contraseña de al menos 5 caracteres')
    .matches(/\d/)
    .withMessage('La contraseña debe contener un numero'),
  fieldValidator,
];

module.exports = { registerValidator, loginValidator };

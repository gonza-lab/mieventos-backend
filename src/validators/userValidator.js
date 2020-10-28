const { check } = require('express-validator');
const fieldValidator = require('../middlewares/fieldValidator');
const User = require('../models/User');

const updateValidator = [
  check('name', 'Debe ingresar un nombre valido.').not().isEmpty(),
  check('email', 'Debe ingresar un email valido.')
    .isEmail()
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });

      if (user && user.id !== req.id) {
        throw new Error('Debe ingresar un email que no este en uso');
      }
    }),
  check('password')
    .isLength({ min: 5 })
    .withMessage('Debe enviar una contraseña de al menos 5 caracteres')
    .matches(/\d/)
    .withMessage('La contraseña debe contener un numero')
    .custom(async (password, { req }) => {
      let user = await User.findById(req.id);
      if (!user.comparePassword(password)) {
        throw new Error('Acceso denegado');
      }
    }),
  check('newPassword')
    .isLength({ min: 5 })
    .withMessage('Debe enviar una contraseña de al menos 5 caracteres')
    .matches(/\d/)
    .withMessage('La contraseña debe contener un numero'),
  fieldValidator,
];

module.exports = { updateValidator };

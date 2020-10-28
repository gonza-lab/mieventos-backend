const { check } = require('express-validator');
const screen = require('../controllers/screen');
const fieldValidator = require('../middlewares/fieldValidator');
const Screen = require('../models/Screen');

const createScreenValidators = [
  check('name', 'Debe enviar un nombre válido')
    .isString()
    .custom(async (name) => {
      const existScreen = await Screen.exists({ name });

      if (existScreen) {
        throw new Error(
          'El nombre de la pantalla que envio ya se encuentra ocupado'
        );
      }
    }),
  check('message', 'Debe enviar un mensaje válido').isString(),
  check('imageUrl', 'Debe enviar una URL válida').isURL(),
  fieldValidator,
];

const updateScreenValidator = [
  check('_id', 'Debe enviar un id válido').isLength({ min: 24, max: 24 }),
  check('_id').custom(async (_id) => {
    const existScreen = await Screen.exists({ _id });

    if (!existScreen) {
      throw new Error('El id que envio no coincide con ninguna pantalla');
    }
  }),
  check('name', 'Debe enviar un nombre válido')
    .isString()
    .custom(async (name, { req }) => {
      const screenDB = await Screen.findOne({ name });

      if (screenDB && req.body._id != screenDB._id) {
        throw new Error(
          'El nombre de la pantalla que envio ya se encuentra ocupado'
        );
      }
    }),
  check('message', 'Debe enviar un mensaje válido').isString(),
  check('imageUrl', 'Debe enviar una URL válida').isURL(),
  fieldValidator,
];

const deleteScreenValidators = [
  check('_id', 'Debe enviar un id válido').isLength({ min: 24, max: 24 }),
  check('_id').custom(async (_id) => {
    const existScreen = await Screen.exists({ _id });

    if (!existScreen) {
      throw new Error('El id que envio no coincide con ninguna pantalla');
    }
  }),
  fieldValidator,
];

module.exports = {
  createScreenValidators,
  deleteScreenValidators,
  updateScreenValidator,
};

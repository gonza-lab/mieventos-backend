const { check } = require('express-validator');
const fieldValidator = require('../middlewares/fieldValidator');
const Screen = require('../models/Screen');
const Card = require('../models/Card');

const createCardValidators = [
  check('screen', 'Debe enviar un id de pantalla valido válido')
    .isLength({ min: 24, max: 24 })
    .custom(async (_id) => {
      const existScreen = await Screen.exists({ _id });

      if (!existScreen) {
        throw new Error('El id que envio no coincide con ninguna pantalla');
      }
    }),
  fieldValidator,
];

const readCardValidators = [
  check('_id').custom(async (_id) => {
    if (_id) {
      if (_id.length !== 24) {
        throw new Error('El id que envio no es valido');
      } else {
        const existsCard = await Card.exists({ _id });
        if (!existsCard) {
          throw new Error(
            'El id de la carta que envio no coincide con niguna pantalla'
          );
        }
      }
    }
  }),
  fieldValidator,
];

const updateCardValidators = [
  check('_id').custom(async (_id) => {
    if (_id) {
      if (_id.length !== 24) {
        throw new Error('El id que envio no es valido');
      } else {
        const existsCard = await Card.exists({ _id });
        if (!existsCard) {
          throw new Error(
            'El id de la carta que envio no coincide con niguna pantalla'
          );
        }
      }
    }
  }),
  fieldValidator,
];

const deleteCardValidators = [
  check('_id').custom(async (_id) => {
    if (_id) {
      if (_id.length !== 24) {
        throw new Error('El id que envio no es valido');
      } else {
        const existsCard = await Card.exists({ _id });
        if (!existsCard) {
          throw new Error(
            'El id de la carta que envio no coincide con niguna pantalla'
          );
        }
      }
    }
  }),
  fieldValidator,
];

module.exports = {
  createCardValidators,
  readCardValidators,
  updateCardValidators,
  deleteCardValidators  
};

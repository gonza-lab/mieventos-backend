const { Router } = require('express');
const {
  createCard,
  readCard,
  updateCard,
  deleteCard,
} = require('../controllers/card');
const {
  createCardValidators,
  readCardValidators,
  updateCardValidators,
  deleteCardValidators,
} = require('../validators/cardValidators');
const { jwtValidator } = require('../middlewares/jwtValidator');

const router = Router();

/*
  ${host}/api/card
*/

router.use(jwtValidator);

router.post('/', [...createCardValidators], createCard);
router.get('/', [...readCardValidators], readCard);
router.put('/', [...updateCardValidators], updateCard);
router.delete('/', [...deleteCardValidators], deleteCard);

module.exports = router;

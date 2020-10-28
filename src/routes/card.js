const { Router } = require('express');
const { createCard, readCard } = require('../controllers/card');
const { jwtValidator } = require('../middlewares/jwtValidator');
const {
  createCardValidators,
  readCardValidators,
} = require('../validators/cardValidators');

const router = Router();

/*
  ${host}/api/card
*/

router.use(jwtValidator);

router.post('/', [...createCardValidators], createCard);
router.get('/', [...readCardValidators], readCard);

module.exports = router;

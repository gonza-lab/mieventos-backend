const { Router } = require('express');
const {
  createScreen,
  deleteScreen,
  readScreen,
  updateScreen,
} = require('../controllers/screen');
const { jwtValidator } = require('../middlewares/jwtValidator');
const {
  createScreenValidators,
  deleteScreenValidators,
  updateScreenValidator,
} = require('../validators/screenValidators');

const router = Router();

/*
  ${host}/api/screen
*/

router.post('/', [jwtValidator, ...createScreenValidators], createScreen);
router.get('/', readScreen);
router.put('/', [jwtValidator, ...updateScreenValidator], updateScreen);
router.delete('/', [jwtValidator, ...deleteScreenValidators], deleteScreen);

module.exports = router;

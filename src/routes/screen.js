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

router.use(jwtValidator);

router.post('/', [...createScreenValidators], createScreen);
router.get('/', readScreen);
router.put('/', [...updateScreenValidator], updateScreen);
router.delete('/', [...deleteScreenValidators], deleteScreen);

module.exports = router;

const { Router } = require('express');
const { updateUser } = require('../controllers/user');
const { jwtValidator } = require('../middlewares/jwtValidator');
const { updateValidator } = require('../validators/userValidator');

const router = Router();

/*
  ${host}/api/user
*/

router.use(jwtValidator);

router.put('/', [...updateValidator], updateUser);

module.exports = router;

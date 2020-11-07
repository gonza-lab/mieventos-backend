const { Router } = require('express');
const { createUser, loginUser, renewUser } = require('../controllers/auth');
const { jwtValidator } = require('../middlewares/jwtValidator');
const {
  registerValidator,
  loginValidator,
} = require('../validators/authValidators');

const router = Router();

/*
  ${host}/api/auth
*/

router.post('/register', [...registerValidator], createUser);
router.post('/login', [...loginValidator], loginUser);
router.get('/renew', jwtValidator, renewUser);

module.exports = router;

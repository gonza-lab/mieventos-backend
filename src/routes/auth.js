const { Router } = require('express');
const { createUser, loginUser } = require('../controllers/auth');
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

module.exports = router;

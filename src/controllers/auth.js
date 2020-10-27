const Usuario = require('../models/User');
const createJWT = require('../helpers/createJWT');

const createUser = async (req, res) => {
  try {
    let user = await Usuario.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un usuario con el mail que ingreso.',
      });
    } else {
      user = new Usuario(req.body);
      await user.encryptPassword();
      await user.save();

      const token = await createJWT(user._id, user.name);

      res.status(201).json({
        ok: true,
        id: user._id,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Porfavor, hable con el administrador.',
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await Usuario.findOne({ email });

    if (!user || !user.comparePassword(password)) {
    return res.status(400).json({
        ok: false,
        msg: 'Contraseña o email incorrecto',
      });
    } else {
      const token = await createJWT(user._id, user.name);

      res.json({
        ok: true,
        id: user._id,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Porfavor, hable con el administrador',
    });
  }
};

module.exports = { createUser, loginUser };

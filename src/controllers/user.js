const User = require('../models/User');

const updateUser = async (req, res) => {
  try {
    const { name, email, newPassword } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un usuario con ese email',
      });
    }

    user = await User.findById(req.id);
    if (user.comparePassword(req.body.password)) {
      user.name = name;
      user.email = email;
      user.password = newPassword;
      await user.encryptPassword();
      await user.save();

      res.json({
        ok: true,
        name,
        email,
      });
    } else {
      return res.status(401).json({
        ok: false,
        msg: 'Acceso denegado.',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador.',
    });
  }
};

module.exports = { updateUser };

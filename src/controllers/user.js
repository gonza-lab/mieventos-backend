const User = require('../models/User');

const updateUser = async (req, res) => {
  try {
    const { name, email, newPassword } = req.body;
    let user = await User.findById(req.id);
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador.',
    });
  }
};

module.exports = { updateUser };

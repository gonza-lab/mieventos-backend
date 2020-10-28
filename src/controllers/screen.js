const Screen = require('../models/Screen');

const createScreen = async (req, res) => {
  try {
    const newScreen = new Screen(req.body);
    await newScreen.save();

    res.status(201).json({
      ok: true,
      ...newScreen.toJSON(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const readScreen = async (req, res) => {
  try {
    const { name } = req.body;
    let screens;
    if (name) {
      screens = await Screen.find({ name }).populate('cards');
    } else {
      screens = await Screen.find().populate('cards');
    }

    res.status(200).json({
      ok: true,
      screens: [...screens],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const updateScreen = async (req, res) => {
  try {
    const { _id, ...card } = req.body;

    await Screen.findByIdAndUpdate(_id, { ...card });

    res.json({
      ok: true,
      ...card,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const deleteScreen = async (req, res) => {
  try {
    await Screen.findByIdAndDelete(req.body._id);

    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

module.exports = { createScreen, deleteScreen, readScreen, updateScreen };

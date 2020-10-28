const { request, response } = require('express');
const Card = require('../models/Card');
const Screen = require('../models/Screen');

const createCard = async (req = request, res = response) => {
  try {
    const newCard = new Card({ ...req.body });
    const screenDB = await Screen.findById(req.body.screen);
    const { _id } = await newCard.save();

    screenDB.cards.push(_id);
    await screenDB.save();

    res.json({
      ok: true,
      ...newCard.toJSON(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el adminstrador',
    });
  }
};

const readCard = async (req = request, res = response) => {
  const { _id } = req.body;
  let cardDB;
  try {
    // if (_id) {
    //   cardDB = await Card.findById(_id).populate('screen');
    // } else {
    //   cardDB = await Card.find().populate('screen');
    // }

    cardDB = _id
      ? [await Card.findById(_id).populate('screen')]
      : await Card.find().populate('screen');

    res.json({
      ok: true,
      cards: cardDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

module.exports = { createCard, readCard };

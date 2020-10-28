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

const updateCard = async (req = request, res = response) => {
  const { _id, ...card } = req.body;
  try {
    await Card.findByIdAndUpdate(_id, card);

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

const deleteCard = async (req = request, res = response) => {
  try {
    const { _id: cardID } = req.body;
    const { screen: screenID } = await Card.findByIdAndDelete(cardID);
    const screenDB = await Screen.findById(screenID);
    const index = screenDB.cards.indexOf(cardID);

    screenDB.cards.splice(index, 1);
    await screenDB.save();

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
module.exports = { createCard, readCard, updateCard, deleteCard };

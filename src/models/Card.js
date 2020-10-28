const { Schema, model } = require('mongoose');
require('./Screen');

const CardSchema = new Schema({
  title: String,
  posicion: Number,
  side: String,
  information: String,
  images: [String],
  hours: Number,
  price: Number,
  screen: {
    type: Schema.Types.ObjectId,
    ref: 'Screen',
    required: true,
  },
});

module.exports = model('Card', CardSchema);

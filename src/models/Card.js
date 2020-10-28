const { Schema, model } = require('mongoose');

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

const CardModel = model('Card', CardSchema);

module.exports = { CardSchema, CardModel };

const { Schema, model } = require('mongoose');
require('./Card');

const ScreenSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  message: String,
  imageUrl: String,
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
});

ScreenSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model('Screen', ScreenSchema);

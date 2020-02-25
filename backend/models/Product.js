const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    name: String,
    price: Number,
    menu: {
      type: String,
      enum: ['Breakfast', 'Rest Day']
    },
    meet: Array,
    extra: Boolean
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model('Product', productSchema);

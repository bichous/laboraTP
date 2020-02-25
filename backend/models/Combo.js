const { Schema, model } = require('mongoose');

const comboSchema = new Schema(
  {
    comboProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model('Combo', comboSchema);

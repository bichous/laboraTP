const { Schema, model } = require('mongoose');

const tableSchema = new Schema(
  {
    number: Number
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model('Table', tableSchema);

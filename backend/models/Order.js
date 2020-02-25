const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    productList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    ],
    totalPrice: Number,
    combo: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Combo',
        default: []
      }
    ],
    status: {
      type: String,
      enum: ['Pending', 'Delivered'],
      default: 'Pending'
    },
    tableId: {
      type: Schema.Types.ObjectId,
      ref: 'Table'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model('Order', orderSchema);

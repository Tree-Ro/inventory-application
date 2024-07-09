const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    numberInStock: { type: Number, default: 0, min: 0 },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    manufacturer: {
      type: Schema.Types.ObjectId,
      ref: 'Manufacturer',
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

ItemSchema.virtual('url').get(function () {
  return `/catalog/item/${this._id}`;
});

module.exports = mongoose.model('Item', ItemSchema);

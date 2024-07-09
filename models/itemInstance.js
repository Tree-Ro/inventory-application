const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemInstanceSchema = new Schema(
  {
    note: { type: String, maxLength: 500 },
    item: { type: Schema.Types.ObjectId, ref: 'Item' },
    expiryDate: { type: Date, default: null },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

ItemInstanceSchema.virtual('url').get(function () {
  return `/catalog/item/${this.item._id}/instance/${this._id}`;
});

module.exports = mongoose.model('ItemInstance', ItemInstanceSchema);

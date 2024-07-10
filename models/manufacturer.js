const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ManufacturerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 100,
    },
  },
  {
    timestamps: true,
  }
);

ManufacturerSchema.virtual('url').get(function () {
  return `/catalog/manufacturer/${encodeURIComponent(this.name)}`;
});

module.exports = mongoose.model('Manufacturer', ManufacturerSchema);

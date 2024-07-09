const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxLength: 50,
  },
  description: { type: String, required: true, trim: true, maxLength: 250 },
});

CategorySchema.virtual('url').get(function () {
  return `/catalog/category/${encodeURIComponent(this.name)}`;
});

module.exports = mongoose.model('Category', CategorySchema);

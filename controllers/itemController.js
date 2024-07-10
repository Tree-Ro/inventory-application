const asyncHandler = require('express-async-handler');
const Item = require('../models/item');
const Manufacturer = require('../models/manufacturer');
const Category = require('../models/category');
const ItemInstance = require('../models/itemInstance');

exports.index = asyncHandler(async function (req, res, next) {
  const items = await Item.find({}).populate('category manufacturer').exec();
  res.render('test', {
    items: items,
  });
});

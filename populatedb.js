#!/usr/bin/env node

console.log(
  'This script populates some test items, manufacturers, categories and item instances to the database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/inventory-application?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require('./models/item');
const Manufacturer = require('./models/manufacturer');
const Category = require('./models/category');
const ItemInstance = require('./models/itemInstance');

const items = [];
const manufacturers = [];
const categories = [];
const itemInstances = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createCategories();
  await createManufacturers();
  await createItems();
  await createItemInstances();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function manufacturerCreate(index, name) {
  const manufacturer = new Manufacturer({ name: name });
  await manufacturer.save();
  manufacturers[index] = manufacturer;
  console.log(`Added manufacturer: ${name}`);
}

async function itemCreate(
  index,
  name,
  description,
  price,
  numberInStock,
  manufacturer,
  category
) {
  const itemDetail = {
    name: name,
    description: description,
    price: price,
    numberInStock: numberInStock,
    manufacturer: manufacturer, // ObjectId
  };
  if (category) itemDetail.category = category; // ObjectId

  const item = new Item(itemDetail);
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function itemInstanceCreate(index, note, item, expiryDate) {
  const itemInstanceDetail = {
    item: item, // ObjectId
  };
  if (note) itemInstanceDetail.note = note;
  if (expiryDate) itemInstanceDetail.expiryDate = expiryDate;

  const itemInstance = new ItemInstance(itemInstanceDetail);
  await itemInstance.save();
  itemInstances[index] = itemInstance;
  console.log(`Added itemInstance: ${item}`);
}

async function createCategories() {
  console.log('Adding categories');
  await Promise.all([
    categoryCreate(0, 'Electronics', 'Devices and gadgets'),
    categoryCreate(1, 'Furniture', 'Tables, chairs, and other furniture'),
    categoryCreate(2, 'Groceries', 'Food and other household items'),
  ]);
}

async function createManufacturers() {
  console.log('Adding manufacturers');
  await Promise.all([
    manufacturerCreate(0, 'Sony'),
    manufacturerCreate(1, 'Samsung'),
    manufacturerCreate(2, 'LG'),
    manufacturerCreate(3, 'Ikea'),
    manufacturerCreate(4, 'Whole Foods'),
  ]);
}

async function createItems() {
  console.log('Adding items');
  await Promise.all([
    itemCreate(
      0,
      'Smartphone',
      'Latest model smartphone with all the new features',
      799.99,
      100,
      manufacturers[0],
      categories[0]
    ),
    itemCreate(
      1,
      '4K TV',
      'Ultra HD 4K television',
      1199.99,
      50,
      manufacturers[1],
      categories[0]
    ),
    itemCreate(
      2,
      'Sofa',
      'Comfortable three-seater sofa',
      499.99,
      20,
      manufacturers[3],
      categories[1]
    ),
    itemCreate(
      3,
      'Dining Table',
      'Wooden dining table with seating for six',
      299.99,
      15,
      manufacturers[3],
      categories[1]
    ),
    itemCreate(
      4,
      'Organic Apples',
      'Fresh organic apples, per pound',
      2.99,
      200,
      manufacturers[4],
      categories[2]
    ),
    itemCreate(
      5,
      'Laptop',
      'High performance laptop for gaming and work',
      1299.99,
      30,
      manufacturers[2],
      categories[0]
    ),
  ]);
}

async function createItemInstances() {
  console.log('Adding item instances');
  await Promise.all([
    itemInstanceCreate(0, 'New batch', items[0], '2025-12-31'),
    itemInstanceCreate(1, 'New batch', items[1], '2025-12-31'),
    itemInstanceCreate(2, 'New stock', items[2], false),
    itemInstanceCreate(3, 'New stock', items[3], false),
    itemInstanceCreate(4, 'Fresh arrival', items[4], '2024-07-15'),
    itemInstanceCreate(5, 'New batch', items[5], '2025-12-31'),
  ]);
}

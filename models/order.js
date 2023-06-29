const mongoose = require('mongoose');

// Оголошення схеми для колекції orders
const orderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  size: String,
  quantity: Number, 
  filename: String
},
 { timestamps: true });

const model = mongoose.model('Order', orderSchema);

module.exports = model;

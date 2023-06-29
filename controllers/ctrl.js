const mongoose = require('mongoose');

const Order = require('../models/order');

 // додавання нового замовлення
   const sendOrder = (order) => {
      Order.create(order);
      console.log('Додано нове замовлення');
  };
   
  module.exports = {
    sendOrder
  }
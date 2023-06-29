const express = require('express');
const bodyParser = require('body-parser');
const mainRoute = require('./routes/main');


const mongoose = require('mongoose');

const server = express();

server.use(bodyParser.json());

server.set('view engine','ejs');
server.set('views', __dirname + '/views');

server.use(express.static(__dirname +  '/public'));

server.use('/', mainRoute);

server.listen(3000);

const connectToDatabase = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/base3', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Підключено до бази даних');
  };

connectToDatabase();  
  


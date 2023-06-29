const express = require('express');
const multer  = require('multer');
const path = require('path');
const fs = require('fs');

const ctrl = require('../controllers/ctrl');

const router = express.Router();

const mongoose = require('mongoose');


// стартова сторінка 
router.get('/', (req, res) => {
  res.render('form');
});

const upload = multer({ dest: 'uploads/' }); // папка для збереження файлів

// збереження відправленого файлу
router.post('/upload', upload.single('file'), (req, res) => {
  // відтворення оригінального імені файлу
  let pp = path.resolve(__dirname);
  pp = pp.replace('routes','');
  const oldPath = pp + req.file.path;
  const newPath = pp + `uploads\\` + req.file.originalname;
  fs.renameSync(oldPath, newPath);
  console.log('Файл збережено: ', newPath);
});

// додавання нового замовлення
router.post('/send_order', (req, res) => {
    ctrl.sendOrder(req.body);
  });


module.exports = router;
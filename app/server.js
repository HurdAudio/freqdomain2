'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');
const bcrypt = require('bcrypt');
const request = require('request');
//const parseString = require('xml2js').parseString;
//const fileUpload = require('express-fileupload');

require('dotenv').config();

const app = express();
// const visitorfeedbacks = require('./routes/visitorfeedbacks.js');
const users = require('./routes/users.js');
const master_volumes = require('./routes/master_volumes.js');
const gains = require('./routes/gains.js');
const oscillators = require('./routes/oscillators.js');
const test_tones = require('./routes/test_tones.js');
const dynamic_compressors = require('./routes/dynamic_compressors.js');
const master_volume_skins = require('./routes/master_volume_skins.js');
const random_number_generators = require('./routes/random_number_generators.js');
const gain_skins = require('./routes/gain_skins.js');

const port = process.env.PORT || 3007;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/../', 'node_modules')));
// app.use('/scripts', express.static(path.join(__dirname, '../node_modules/vexflow/releases/')));
//app.use('/moment', express.static(path.join(__dirname, '../node_modules/moment/min/')));
//app.use(fileUpload());



 app.use('/users', users);
 app.use('/master_volumes', master_volumes);
 app.use('/gains', gains);
 app.use('/oscillators', oscillators);
 app.use('/test_tones', test_tones);
 app.use('/dynamic_compressors', dynamic_compressors);
 app.use('/master_volume_skins', master_volume_skins);
 app.use('/random_number_generators', random_number_generators);
 app.use('/gain_skins', gain_skins);

//
// app.post('/xmlconverter/', (req, res, next)=>{
//   //console.log(req.body.data);
//    parseString(req.body.data, (err, result)=>{
//      res.send(result);
//    });
// });
//
// app.post('/photo_upload', (req, res, next)=>{
//   console.log(req);
//   if (!req.files) {
//     return res.status(400).send('No files were uploaded.');
//   }
//   let photo = req.files.userPhoto;
//   let link = './uploads/' + photo.name;
//   photo.mv(link, function(err) {
//     if (err) {
//       return res.status(500).send(err);
//     }
//
//     res.send(link);
//   });
//
// });


app.use('*', function(req, res, next) {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')});
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



app.listen(port, () => {
  console.log('Listening on port', port);
  console.log('postgreSQL is lit.');
});

module.exports = app;

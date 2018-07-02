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
const low_pass_filters = require('./routes/low_pass_filters.js');
const oscillator_skins = require('./routes/oscillator_skins.js');
const high_pass_filters = require('./routes/high_pass_filters.js');
const test_tone_skins = require('./routes/test_tone_skins.js');
const envelope_generators = require('./routes/envelope_generators.js');
const dynamic_compressor_skins = require('./routes/dynamic_compressor_skins.js');
const news_tickers = require('./routes/news_tickers.js');
const weather_modules = require('./routes/weather_modules.js');
const random_number_generator_skins = require('./routes/random_number_generator_skins.js');
const bandpass_filters = require('./routes/bandpass_filters.js');
const lowpass_filter_skins = require('./routes/lowpass_filter_skins.js');
const messages = require('./routes/messages.js');

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
 app.use('/low_pass_filters', low_pass_filters);
 app.use('/oscillator_skins', oscillator_skins);
 app.use('/high_pass_filters', high_pass_filters);
 app.use('/test_tone_skins', test_tone_skins);
 app.use('/envelope_generators', envelope_generators);
 app.use('/dynamic_compressor_skins', dynamic_compressor_skins);
 app.use('/news_tickers', news_tickers);
 app.use('/weather_modules', weather_modules);
 app.use('/random_number_generator_skins', random_number_generator_skins);
 app.use('/bandpass_filters', bandpass_filters);
 app.use('/lowpass_filter_skins', lowpass_filter_skins);
 app.use('/messages', messages);

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

app.get('/flights_from_tiles/:x/:y', (req, res, next)=>{
  let queryString = 'https://api.laminardata.aero/v1/tiles/3/' + req.params.x + '/' + req.params.y + '/flights?user_key=' + process.env.LARIMAR_KEY + '&format=json';
  return request(queryString).pipe(res);
});

app.get('/airlines_lookup/:code', (req, res, next)=>{
  let queryString = 'https://v4p4sz5ijk.execute-api.us-east-1.amazonaws.com/anbdata/airlines/designators/code-list?api_key=' + process.env.ISTARS_KEY + '&operators=' + req.params.code;
  return request(queryString).pipe(res);
});

app.get('/airport_lookup/:code', (req, res, next)=>{
  let queryString = 'https://v4p4sz5ijk.execute-api.us-east-1.amazonaws.com/anbdata/airports/locations/doc7910?&api_key=' + process.env.ISTARS_KEY + '&airports=' + req.params.code;
  return request(queryString).pipe(res);

});

app.get('/reuters_headlines/:country', (req, res, next) =>{
  let newUrl = 'https://newsapi.org/v2/top-headlines?country=';
  let queryString = newUrl + req.params.country + '&apiKey=' + process.env.REUTERS_KEY;
  return request(queryString).pipe(res);
});


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

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./app/config/environment');

var app = express();

// Configuration
var port = process.env.PORT || 8000;
console.log('### ENV: ' + process.env.NODE_ENV);
console.log('### MongoDB: ' + config.mongo.uri);
mongoose.connect(config.mongo.uri);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan(process.env.NODE_ENV === 'dev' ? 'dev' : 'tiny'));

app.get('/', function(req, res) {
  res.send('Welcome to access worktime API, please contact with yukangle@outlook.com for permission.');
});

// Configure for app routes
require('./app/routes')(app);

// Seed database if required
if (config.seedDB) { require('./app/config/seed'); }

// start the application
app.listen(port, function() {
  console.log('Worktime API is listening on port ' + port);
});
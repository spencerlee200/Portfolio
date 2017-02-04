var NODE_ENV = process.env.NODE_ENV || 'development';
if(NODE_ENV === 'development') {
  require('dotenv').load();
}
var express = require('express');
var app = express();

var port = 3000;

app.listen(port, function() {
  console.log('Server running on port: '+ port);
});

var appJS = require('./app/app.js')
appJS(app);

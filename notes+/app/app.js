var glob = require('glob');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressSession = require('express-session');
var dbauth = require('./db-auth');
var db = require('./db');
var express = require('express');

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function(id, cb) {
  dbauth.findById(id, function(err, user) {
    if(err) {
      return cb(error);
    }
    cb(null,user);
  });
});

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(expressSession({
    secret:'49gh98h9wh98hf89wwio3hth',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(__dirname + '/public'));

  var models = glob.sync(__dirname + '/models/*.js');
  models.forEach(function(modelFileName) {
    require(modelFileName);
  });

  var controllers = glob.sync(__dirname + '/controllers/*.js');
  controllers.forEach(function(controllerFileName){
    require(controllerFileName)(app);
  });
}

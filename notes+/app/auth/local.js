var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('../db-auth/');

passport.use(new Strategy(function(username, password, cb) {
  db.findByUsername(username, function(err, user) {
    if(err) {
      return cb(err);
    }
    else if(!user) {
      return cb(null, false);
    }
    else if(user.password != password) {
      return cb(null, false);
    }
    else {
      return cb(null, user);
    }
  })
}));

module.exports = passport;

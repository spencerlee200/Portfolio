var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var config = require('../config');
var db = require('../db-auth/');

String.prototype.capitalize = function(){
  return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
};

passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
    db.findOrCreate({ id: profile.id, username: profile.displayName.capitalize()}, function (err, user) {
      return cb(err, user);
    });
  }
));

var passport = require('passport');
var GithubStrategy = require('passport-github2').Strategy;
var config = require('../config');
var db = require('../db-auth/');

passport.use(new GithubStrategy({
  clientID: config.github.clientID,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackURL
},
function(accessToken, refreshToken, profile, done) {
  db.findOrCreate({
    id: profile.id,
    displayName: profile.displayName,
    username: profile.username
  }, function(err, user) {
    done(err, user);
  })
}));

module.exports = passport;

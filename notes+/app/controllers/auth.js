var express = require('express');
var router = express.Router();
var passport =  require('passport');
var passportLocal = require('../auth/local');
var passportGithub = require('../auth/github');
var passportGoogle = require('../auth/google');

module.exports = function(app) {
  app.use('/', router);
  app.set('view engine', 'pug');
  app.set('views', './app/views');
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

router.get('/auth/github', passportGithub.authenticate('github', {scope: ['user.email']}));
router.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/login'}), function(req, res, next) {
  res.redirect('/');
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
});

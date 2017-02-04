var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

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

function savePost(post) {
  Post.create({
    text: post.text,
    note_id: post.note_id },
    function (err) {
      if (err) return handleError(err);
  })
}
router.post('/add/post', function(req,res, next) {
  req.post = req.body;
  savePost(req.post);
  res.redirect(req.get('referer'));
});

router.post('/editPost/:id', function(req,res, next) {
  req.update = req.body;
  Post.update({ _id: req.params.id }, { $set: { text: req.update.text }}, function (err, post) {
    if (err) return handleError(err);
    res.redirect(req.get('referer'));
  })
});

router.get('/post/delete/:id', isLoggedIn, function(req,res, next) {
  Post.remove({ _id: req.params.id }, function (err, post) {
    if (err) return handleError(err);
  });
  res.redirect(req.get('referer'));
});

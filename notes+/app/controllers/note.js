var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var NoteBook = mongoose.model('NoteBook');
var Note = mongoose.model('Note');
var Movie = mongoose.model('Movie');
var Book = mongoose.model('Book');
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

router.get('/note/:id', function(req,res, next) {
  Note.findOne({ _id: req.params.id }, function (err, note) {
    NoteBook.findOne({ _id: note.notebook_id }, function (err, notebook ) {
      if(note.type == "Default") {
        res.render('note', { user: req.user, note: note, title: notebook.title });
      }
      if(note.type == "Board") {
        Post.find({ note_id: req.params.id }, function(err, posts) {
          res.render('note', { user: req.user, note: note, posts: posts, title: notebook.title });
        });
      }
      if(note.type == "To Watch") {
        Movie.find({ note_id: req.params.id }, null, {sort: {status: 1 }}, function(err, movies) {
          res.render('note', { user: req.user, note: note, movies: movies, title: notebook.title, errors: "" });
        });
      }
      if(note.type == "To Read") {
        Book.find({ note_id: req.params.id }, null, {sort: {status: 1 }}, function(err, books) {
          res.render('note', { user: req.user, note: note, books: books, title: notebook.title });
        });
      }
    });
  });
});

router.get('/note/delete/:id/:notebook', isLoggedIn, function(req,res, next) {
  Note.remove({ _id: req.params.id }, function (err, note) {
    if (err) return handleError(err);
    if(note.type == "Board") {
      Post.remove({ note_id: req.params.id }, function(err, posts) {
        if (err) return handleError(err);
      });
    }
    if(note.type == "To Watch") {
      Movie.remove({ note_id: req.params.id }, function(err, movies) {
        if (err) return handleError(err);
      });
    }
    if(note.type == "To Read") {
      Book.remove({ note_id: req.params.id }, function(err, books) {
        if (err) return handleError(err);
      });
    }
  });
  res.redirect('/notebook/' + req.params.notebook);
});

router.post('/edit/note/:id', function(req,res, next) {
  req.update = req.body;
  Note.update({ _id: req.params.id }, { $set: { content: req.update.text }}, function (err, note) {
    if (err) return handleError(err);
    res.redirect(req.get('referer'));
  })
});

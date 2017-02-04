var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Note = mongoose.model('Note');
var Book = mongoose.model('Book');
var rp = require('request-promise');

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

function saveBook(book) {
  Book.create({
    title: book.title,
    subtitle: book.subtitle,
    author: book.authors[0],
    publishedDate: book.publishedDate,
    description: book.description,
    cover: book.imageLinks.thumbnail,
    note_id: book.note_id,
    status: book.status
  })
}

router.post('/add/Book', function(req,res, next) {
  req.book = req.body;

  var options = {
    uri: 'https://www.googleapis.com/books/v1/volumes?q=' + req.book.title + req.book.author + '&filter=ebooks&key=AIzaSyDuW3s0aB0vN3ClTy5NAJa1oLNHIORyEwY',
    json: true
  };
  rp(options)
    .then(function (book) {
        book = book.items[0].volumeInfo;
        book.note_id = req.book.note_id;
        book.status = "false";
        if (book.imageLinks.thumbnail == undefined) {
          res.redirect(req.get('referer'));
        }
        else {
          saveBook(book);
          res.redirect(req.get('referer'));
        }
    })
    .catch(function (err) {
        // OH GOD WHAT HAS HAPPENED
  });
});

router.get('/book/:title', function( req,res,next ) {
  Book.findOne({ title: req.params.title }, function(err, book) {
    res.render('book', { user: req.user, book: book, back: req.get('referer')});
  });
});

router.get('/check/book/:id', function(req,res, next) {
  Book.update({ _id: req.params.id }, { $set: { status: "true" }}, function (err, book) {
    if (err) return handleError(err);
    res.redirect(req.get('referer'));
  })
});

router.get('/remove/book/:id', isLoggedIn, function(req,res, next) {
  Book.remove({ _id: req.params.id }, function (err, book) {
    if (err) return handleError(err);
  });
  res.redirect(req.get('referer'));
});

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Note = mongoose.model('Note');
var Movie = mongoose.model('Movie');
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

function saveMovie(movie) {
  Movie.create({
    title: movie.Title,
    year: movie.Year,
    rated: movie.Rated,
    runtime: movie.Runtime,
    genre: movie.Genre,
    director: movie.Director,
    actors: movie.Actors,
    plot: movie.Plot,
    poster: movie.Poster,
    imdbID: movie.imdbID,
    status: movie.status,
    note_id: movie.note_id
  })
}

router.post('/add/Movie', function(req,res, next) {
  req.movie = req.body;

  var options = {
    uri: 'http://www.omdbapi.com/?t=' + req.movie.title + "&r=json",
    json: true
  };
  rp(options)
    .then(function (movie) {
        movie.note_id = req.movie.note_id;
        movie.status = "false";
        if (movie.Poster == undefined) {
          res.redirect(req.get('referer'));
        }
        else {
          saveMovie(movie);
          res.redirect(req.get('referer'));
        }
    })
    .catch(function (err) {
        // OH GOD WHAT HAS HAPPENED
  });
});

router.get('/movie/:title', function( req,res,next ) {
  Movie.findOne({ title: req.params.title }, function(err, movie) {
    res.render('movie', { user: req.user, movie: movie, back: req.get('referer')});
  });
});

router.get('/check/movie/:id', function(req,res, next) {
  Movie.update({ _id: req.params.id }, { $set: { status: "true" }}, function (err, movie) {
    if (err) return handleError(err);
    res.redirect(req.get('referer'));
  })
});

router.get('/remove/movie/:id', isLoggedIn, function(req,res, next) {
  Movie.remove({ _id: req.params.id }, function (err, movie) {
    if (err) return handleError(err);
  });
  res.redirect(req.get('referer'));
});

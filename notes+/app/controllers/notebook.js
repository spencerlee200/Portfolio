var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var NoteBook = mongoose.model('NoteBook');
var Note = mongoose.model('Note');

module.exports = function(app) {
  app.use('/', router);
  app.set('view engine', 'pug');
  app.set('views', './app/views');
}

function saveNote(note) {
  Note.create({
    title: note.title,
    type: note.type,
    content: note.content,
    access: note.access,
    notebook_id: note.notebook_id },
    function (err) {
      if (err) return handleError(err);
  })
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

router.get('/notebook/:id', function(req,res, next) {
  NoteBook.findOne({ _id: req.params.id }, null, function (err, notebook) {
    Note.find({ notebook_id: req.params.id }, null, function (err, notes) {
      res.render('notebook', { user: req.user, notebook: notebook, notes: notes});
    });
  });
});

router.post('/notebook', function(req,res, next) {
  req.note = req.body;
  saveNote(req.note);
  res.redirect(req.get('referer'));
});

router.get('/delete/:id', isLoggedIn, function(req,res, next) {
  NoteBook.remove({ _id: req.params.id }, function (err, notebook) {
    if (err) return handleError(err);
  });
  res.redirect('/');
});

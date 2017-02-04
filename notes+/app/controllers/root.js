var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var NoteBook = mongoose.model('NoteBook');

module.exports = function(app) {
  app.use('/', router);
  app.set('view engine', 'pug');
  app.set('views', './app/views');
}

function saveNoteBook(notebook) {
  if(notebook.theme == 'Ocean')
  {
    notebook.primary = '#011627';
    notebook.secondary = '#F6F4F3';
    notebook.highlight = '#3066BE';
    notebook.color = 'white';
  }
  else if(notebook.theme == 'Leather')
  {
    notebook.primary = '#E4C3AD';
    notebook.secondary = '#81F4E1';
    notebook.highlight = 'transparent';
    notebook.color = 'white';
  }
  else if(notebook.theme == 'Night')
  {
    notebook.primary = '#000501';
    notebook.secondary = '#000501';
    notebook.highlight = '#FFFFFC';
    notebook.color = 'white';
  }
  else if(notebook.theme == 'Beach')
  {
    notebook.primary = '#FFFFFF';
    notebook.secondary = '#EF5B5B';
    notebook.highlight = '#38618C';
    notebook.color = 'black';
  }
  else if(notebook.theme == 'Forrest')
  {
    notebook.primary = '#243E36';
    notebook.secondary = '#7CA982';
    notebook.highlight = 'transparent';
    notebook.color = 'whitesmoke';
  }
  else if(notebook.theme == 'Coral')
  {
    notebook.primary = '#FF8552';
    notebook.secondary = '#E6E6E6';
    notebook.highlight = 'transparent';
    notebook.color = 'whitesmoke';
  }
  else if(notebook.theme == '-Custom-')
  {
    notebook.primary= notebook.p;
    notebook.secondary = notebook.s;
    notebook.highlight = notebook.h;
    notebook.color = notebook.c;
  }

  NoteBook.create({
    title: notebook.title,
    access: notebook.access,
    primary: notebook.primary,
    secondary: notebook.secondary,
    highlight: notebook.highlight,
    color: notebook.color,
    owner_id: notebook.owner_id },
    function (err) {
      if (err) return handleError(err);
  })
}

router.get('/', function(req, res, next) {
  NoteBook.find(function (err, notebooks){
    res.render('home', {title: 'Notes +', msg: 'Welcome to Notes +',user: req.user, notebooks: notebooks});
  });
});

router.get('/secret', function(req, res, next) {
    res.render('secret', {user: req.user});
});

router.post('/', function(req,res, next) {
  req.notebook = req.body;
  saveNoteBook(req.notebook);
  res.redirect('/');
});

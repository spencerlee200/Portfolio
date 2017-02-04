var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({ id: 'string', title: 'string', year: 'string', rated: 'string', runtime: 'string', genre: 'string', director: 'string', actors: 'string', plot: 'string', poster: 'string', status: 'string', imdbID: 'string',note_id: 'string' });
module.exports = mongoose.model('Movie', MovieSchema);

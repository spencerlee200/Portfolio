var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({id: 'string', title: 'string', subtitle: 'string', author: 'string', publishedDate: 'string', description: 'string', cover: 'string', note_id: 'string', status: 'string' });
module.exports = mongoose.model('Book', BookSchema);

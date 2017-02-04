var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({id: 'string', title: 'string', type: 'string', content: 'string', access: 'boolean', notebook_id: 'string'});
module.exports = mongoose.model('Note', NoteSchema);

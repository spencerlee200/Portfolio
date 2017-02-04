var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({id: 'string', text: 'string', note_id: 'string'});
module.exports = mongoose.model('Post', PostSchema);

var mongoose = require('mongoose');

var NoteBookSchema = new mongoose.Schema({id: 'string', title: 'string', access: 'string', primary: 'string', secondary: 'string', highlight: 'string', color: 'string', owner_id: 'string'});
module.exports = mongoose.model('NoteBook', NoteBookSchema);

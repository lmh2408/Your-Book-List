var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookList = new Schema({
  username: {type: Schema.Types.ObjectId, ref: 'User'},
  bookId: {type: String, unique: true},
  bookName: {type: String},
  status: {type: String, enum: ['plan-to-read', 'reading', 'finished'], default: 'plan-to-read'},
  date_created: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('BookList', BookList);

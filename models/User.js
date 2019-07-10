var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  username: {type: String, trim: true, minlength: 5, maxlength: 50},
  hash: {type: String},

});

module.exports = mongoose.model('User', User);

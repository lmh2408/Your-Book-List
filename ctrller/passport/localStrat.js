var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');

var User = require('../../models').User;


var strategy = new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  (username, password, cb)=>{
    User.findOne({username: username}, (err, user)=>{
      if (err) return cb(err);
      if (!user) return cb(null, false);

      bcrypt.compare(password, user.hash, (er, result)=>{
        if (er) return cb(er);
        if (result == true) return cb(null, user);
        else return cb(null, false);
      });
    });
  }
);

passport.use(strategy);

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport

const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');

var localStrat = require('../passport').localStrat;
var User = require('../../models').User;


var sanitizeInput = [
  body('username')
    .trim()
    .isString()
    .not().matches(' ')
    .escape()
    .isLength({min: 5, max: 50}),

  body('password')
    .trim()
    .isString()
    .not().matches(' ')
    .isLength({min: 6, max: 50}),

  body('confirm')
    .trim()
    .isString()
    .not().matches(' ')
    .isLength({min: 6, max: 50})
];


exports.login = [
  sanitizeInput[0], sanitizeInput[1],

  (req, res, next)=>{
    var errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).send('Invalid input.');
  },

  (req, res, next)=>{
    localStrat.authenticate('local', (err, user)=>{
      if (err) return next();

      if (!user) return res.status(400).send('Invalid credential.');

      req.login(user, (err)=>{
        if (err) return next(err);
        return res.status(200).send(`Logged in as ${user.username}.`);
      });
    })(req, res, next);
  }
];


// body 'username', 'password', 'confirm'
exports.register = [
  sanitizeInput,

  (req, res, next)=>{
    if (req.body.password !== req.body.confirm) {
      return res.status(400).send('Invalid input.');
    }
    next();
  },

  (req, res, next)=>{
    var errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).send('Invalid input.');
  },

  (req, res, next)=>{
    User.findOne({username: req.body.username}, (err, result)=>{
      if (err) return next(err);
      if (result) return res.status(400).send('Username already exists.');

      bcrypt.hash(req.body.password, 8, (err, hash)=>{
        if (err) return next(err);

        var newUser = new User({username: req.body.username, hash: hash});
        newUser.save((err, createdUser)=>{
          if (err) return next(err);
          req.login(createdUser, (err)=>{
            if (err) return next(err);
            res.status(200).send(`Logged in as "${createdUser.username}".`);
          })
        });
      });
    });
  }
];


exports.logout = (req, res, next)=>{
  if (!req.user) {
    return res.status(401).send('No session to logout');
  }
  req.logout();
  res.status(200).send('Logged out!');
};


exports.checkSession = (req, res, next)=>{
  if (!req.user) {
    return res.status(401).send('No session');
  }
  return res.status(200).send(`Session exists.`);
}

var express = require('express');
var path = require('path');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var compression = require('compression');
var helmet = require('helmet');

var indexRouter = require('./routes/index');

var app = express();

app.use(helmet())
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));


var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{console.log('Connected to database!')});


var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var sess = {
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({url: process.env.REDIS_URL}),
  cookie: {
    unset: 'destroy'
  }
};
if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
  sess.cookie.secure = true;
}
app.use(session(sess));


var passport = require('./ctrller').passport.localStrat;
app.use(passport.initialize());
app.use(passport.session());


app.get('*', (req, res, next) => {
  if (req.headers['x-forwarded-proto'] != 'https'){
    res.redirect('https://' + req.hostname + req.url);
  } else {
    next();
  }
});
app.use('/', indexRouter);


module.exports = app;

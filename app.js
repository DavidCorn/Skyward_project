const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const routes = require('./routes/index');
const login = require('./routes/login');
const logout = require('./routes/logout');
const register = require('./routes/register');
const setupPassport = require('./passport');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  key: 'KEY',
  secret: 'SECRET331156%^!fafsdaasd',
  saveUninitialized: true,
  resave: false,
}));
app.use(express.static(path.join(__dirname, 'public')));

setupPassport(app);

app.use('/', routes);
app.use('/users/login', login);
app.use('/users/logout', logout);
app.use('/users/register', register);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

const http = require('http');
const server = http.createServer(app);

app.set('port', process.env.PORT || 3001);
server.listen(app.get('port'));
console.log("server is listening on port 3001");

module.exports = app;

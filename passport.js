const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const User = require('./models/User.js');

function setup(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.username);
  })

  passport.deserializeUser((username, done) => {
    User.findOne({ name: username }).exec()
      .then((user) => {
        if (user === null) {
          done(new Error('Wrong user name.'));
        }

        done(null, user);
      });
  })

  passport.use('local_strategy', new LocalStrategy(
    (username, password, done) => {
      User.findOne({ username }).exec()
        .then((user) => {
          if (user === null) {
            return done(null, false, { message: 'username not found' });
          }

          const hashedPassword = bcrypt.hashSync(password, user.salt);

          if (user.password === hashedPassword) {
            return done(null, user, 'username with password correct');
          }

          return done(null, false, { message: 'password wrong' });
        });
    }
  ));
}

module.exports = setup;

'use strict';
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const User = require('../models/User');

class JoinController {
  authenticate(req, res, next) {
    passport.authenticate('local_strategy', (err, user, info) => {
      if (err) return next(err);

      if (!user) {
        return res.send({ state: 'failure', message: info.message });
      }

      req.logIn(user, (error) => {
        if (error) throw (error);
        return res.send({ state: 'success', message: info.message });
      });
    })(req, res, next);
  }

  register(req, res, next) {
    passport.authenticate('local_strategy', (err, user, info) => {
      if (err) return next(err);

      if (user || info.message === 'password wrong') {
        return res.send({ state: 'failure', message: 'username exist' });
      }

      this.createNewCitizen(req.body.username, req.body.password)
        .then(() => {
          res.send({ state: 'success', message: 'register success' });
        });
    })(req, res, next);
  }

  createNewCitizen(name, password) {
    console.log(`${this.constructor.name}: createNewCitizen`);
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log(
      `${this.constructor.name}:username=${name}, hashedPassword=${hashedPassword}, salt=${salt}`);

    const user = new User({
      username: name,
      password: hashedPassword,
      salt,
    });
    return user.save();
  }

  logout(req, res) {
    console.log(`${this.constructor.name}: user(${req.body.username}) logout`);
    res.send({ state: 'success', message: 'logout success' });
  }
}

module.exports = JoinController;

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable new-cap */
/* eslint-disable max-len */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwtStrategy = require('passport-jwt').Strategy;
const UserModel = require('../models/user.model.ts');

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.access_token;
  }
  return token;
};

// Authorization Startegy
// Aftre every authentication we will have to send token with every request (cookie)
passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: cookieExtractor, // custom function we are providing to extract jwt from request
      secretOrKey: 'NoobCoder', // use to verify the token
    },
    (payload, done) => {
      // check user exist
      // payload.subj===payload subject and has primary id of model
      UserModel.findOne({ _id: payload.sub }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    },
  ),
);

// Authetication local strategy using username and password
passport.use(
  new LocalStrategy((username, password, done) => {
    console.log(
      ' *** passport.use[localStrategy((username, password, done)] *** ',
    );
    UserModel.findOne({ username }, (err, user) => {
      // something went wrong with databse
      if (err) {
        return done(err);
      }
      // if no user with above username exists
      if (!user) {
        // null means there is no error
        // false means no user found
        return done(null, false);
      }
      // check if password is correct
      user.comparePassword(password, done);
    });
  }),
);

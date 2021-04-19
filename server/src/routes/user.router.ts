/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
const express = require('express');

const userRouter = express.Router();
const passport = require('passport');
const JWT = require('jsonwebtoken');
const { body, validationResult, errors } = require('express-validator/check');
const passportConfig = require('../passport/passport.ts');
const UserModel = require('../models/user.model');

/*
! Helpers function
*/
const signToken = (userID) => JWT.sign({
  iss: 'NoobCoder',
  sub: userID,
},
'NoobCoder', {
  expiresIn: '1d',
});
/*
    ! Register Route
*/

// //middleware that is specific to this router
// userRouter.use(function timeLog(req, res, next) {
//     // console.log(req.headers);
//     // console.log("Body :" + req.body);
//     console.log(req.body);
//     // console.log(req.cookies);
//     // console.log(req.secret);
//     // console.log(req.signedCookies);

//     console.log("Time: ", Date.now());

//     next();
// });

userRouter.post('/register', [
  /*
     *-Empty Check
     *-Username Exists Check
     */
  //   body('username').not().isEmpty().custom((value)=>{
  // return UserModel.findUserByUsername(value).then(username => {
  //   if (username) {
  //     return Promise.reject('Username already in use');
  //   }
  // });
  //   }),
  //   /*
  //  *-Empty Check
  //  *-Email Exists Check
  //  */
  //   body('email').not().isEmpty().isEmail().custom((value)=>{
  //     return UserModel.findUserByEmail(value).then(email => {
  //       if (email) {
  //         return Promise.reject('Email already in use');
  //       }
  //     })
  //   }),

  body('password').not().isEmpty(),
  body('email').not().isEmpty(),
  body('username').not().isEmpty(),
  body('mobile').not().isEmpty(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(req.body);
    console.log(errors);
    return res.status(422).jsonp(errors.array());
  }

  const newUser = {
    username: req.body.username,
    email: req.body.email,
    mobile: req.body.mobile,
    password: req.body.password,
    role: 'user',
  };
  console.log(req.body);
  const dbQuery = new UserModel(newUser);
  dbQuery.save((err, document) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: {
          msgBody: 'Error while registering user',
          msgError: true,
          debugErr: err,
        },
      });
    } else {
      res.status(201).json({
        message: {
          msgBody: 'User account  registered successfully',
          msgError: false,
          debugErr: document,
        },
      });
    }
  });
});

/*
    ! Login Route
*/
userRouter.post(
  '/login',
  // passport.authenticate('local', { session: false }),
  (req, res) => {
    console.log('******************');
    console.log(req.body);
    if (req.isAuthenticated()) {
      /*
            ! this object is returned from userSchema.comparePassword methodusing this keyword
            */
      const { _id, username, role } = req.user;
      /*
            ! create JWT token
            */
      const token = signToken(_id);
      /*
            ! HTTP ONLY ==on the client side you cannot touch this cookie using javascript
            ! prevents cross site scripting attacks
            ! SAME SITE == prevents cross site request frogery attack
            */

      res.cookie('access_token', token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    } else {
      res.status(200).json({ isAuthenticated: true, user: { username: 'username', role: 'role' } });
    }
  },
);

/*
    ! Logout Route
*/
userRouter.get(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('/logout');
    res.clearCookie('access_token');
    res.json({ user: { username: '', role: '' }, success: true });
  },
);

/*
?  TODO create
*/

userRouter.post(
  '/admin',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.role === 'admin') {
      res.status(200).json({
        message: {
          msgBody: 'you are admin',
          msgError: false,
          debugErr: req.user.role,
        },
      });
    } else {
      res.status(403).json({
        message: {
          msgBody: 'user not admin ',
          msgError: true,
          debugErr: req.user.role,
        },
      });
    }
  },
);
/*
? this route is especially for react tomake sure persistence exist
! once we login close browser react forgets so as express server so
@
*/

userRouter.get(
  '/authenticated',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('====================================');
    console.log('authenticated');
    console.log('====================================');
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
  },
);
module.exports = userRouter;
export {};

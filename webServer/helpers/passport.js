const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwtStrategy = require("passport-jwt").Strategy;
const adminModal = require("../models/admin.model");
const pool = require("../config/asyncAwaitMysql-pool");

const cookieExtractor = (req) => {

    let token = null;
    if (req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
};

//Authorization Startegy
//After every authentication we will have to send token with every request (cookie)
passport.use(
    new jwtStrategy({
            jwtFromRequest: cookieExtractor, //custom function we are providing to extract jwt from request
            secretOrKey: process.env.PASSPORT_SECRET_KEY, //use to verify the token
        },
        async(payload, done) => {
            //check user exist
            //payload.subj===payload subject and has primary id of model
            let queryBuilder = `SELECT * FROM user WHERE id = ? LIMIT 1`;
            executeQuery = await pool.query(queryBuilder, [payload["sub"]]).then((data) => {
                //if user found

                if (data.length > 0) {
                    //compare password
                    return done(null, data[0])
                } else {
                    return done(null, false);
                }

            })
        }))


//Authetication local strategy using username and password
// passport.use(
//   new LocalStrategy((username, password, done) => {
//     console.log(
//       " *** passport.use[localStrategy((username, password, done)] *** "
//     );
//     userModel.findOne({ username }, (err, user) => {
//       //something went wrong with databse
//       if (err) {
//         return done(err);
//       }
//       //if no user with above username exists
//       if (!user) {
//         //null means there is no error
//         //false means no user found
//         return done(null, false);
//       }
//       //check if password is correct
//       user.comparePassword(password, done);
//     });
//   })
// );

passport.use(
    new LocalStrategy(async(username, password, done) => {
        console.log(
            " *** passport.use[localStrategy((username, password, done)] *** "
        );
        let queryBuilder = `SELECT * FROM user WHERE username = ? LIMIT 1`;
        executeQuery = await pool.query(queryBuilder, [username]).then((data) => {
            //if user found
            if (data.length > 0) {
                //compare password
                adminModal.comparePassword(password, data[0]["password"], data[0], done)
            } else {
                return done(null, false);
            }
        });
    })
);
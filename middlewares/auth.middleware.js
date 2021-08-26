const passport = require("passport");
const passportJWT = require("passport-jwt");

const User = require("../models/user.model");

passport.use(
  new passportJWT.Strategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    },
    function (jwtPayload, done) {
      return User.findById(jwtPayload.userId)
        .then((user) => {
          return done(null, user);
        })
        .catch((error) => {
          return done(error);
        });
    }
  )
);

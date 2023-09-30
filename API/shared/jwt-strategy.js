const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const { Users } = require("../models");
const passport = require("passport");
const opts = {};
const {
  application: { jwtKey },
} = require("../config/config.json");

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtKey;
const jwtStrategy = (passport, req) => {
  try {
    passport.use(
      new JwtStrategy(opts, async function (jwt_payload, done) {
        const user = await Users.findOne({ _id: jwt_payload.id });
        if (user) {
          return done(null, user);
        }
      })
    );
  } catch (err) {
    console.log("errAuth", err);
    return done(err, false);
  }
};

module.exports = jwtStrategy;

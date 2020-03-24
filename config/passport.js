require('dotenv').config();

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../models').User;

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = process.env.SECRET;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({
      where: {
        id: jwt_payload.id
      }
    })
    .then(function(dbUser) {
      if (!dbUser) {
        done(null, false);
      }
      return done(null, dbUser);
    })
    .catch(function(error) {
      return done(error, false);
    });
  }));
};

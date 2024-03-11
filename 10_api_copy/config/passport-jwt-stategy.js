const  passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;       //
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/userSchema');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),        //finding jwt from header
    secretOrKey : 'codeial'                                         //decrypt using codeial
}

passport.use(new JWTStrategy(opts, async function (jwtPayLoad, done) {
    try {
        const user = await User.findById(jwtPayLoad._id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        console.log(err);
        return done(err);
    }
}));




module.exports = passport;
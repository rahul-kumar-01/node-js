const passport = require('passport');
const googleStrategy = require ('passport-google-oauth').OAuth2Strategy;
const crypto = require ('crypto');
const User = require ('../models/userSchema');



passport.use(
    new googleStrategy(
        {
            clientID: "1027067829249-up8dmm3knp61pfs64tqark54p8u9f7hl.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:8080/user/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await User.findOne({ userEmailId: profile.emails[0].value });

                console.log(accessToken, refreshToken);
                console.log(profile);

                if (user) {
                    // If found, set this user as req.user
                    return done(null, user);
                } else {
                    // If not found, create the user and set it as req.user
                    const newUser = await User.create({
                        userName: profile.displayName,
                        userEmailId: profile.emails[0].value,
                        userPassword: crypto.randomBytes(20).toString('hex'),
                    });
                    return done(null, newUser);
                }
            } catch (err) {
                console.log('error in google strategy-passport', err);
                return done(err, null);
            }
        }
    )
);


module.exports = passport;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userSchema');


//authentication using passport

//We tell passport to use this LocalStrategy
passport.use(new LocalStrategy({
    usernameField: 'email',
},
    async function (email, password, done) {
        try {
            const user = await User.findOne({ email: email });
            if (!user || user.password != password) {
                return done(null, false, { message: 'Invalid email or password.' });
            }

            //error is null and authetication is false
            //done is callback function that is reporting to passport . js

            // Here, you should add password verification logic.
            // For security reasons, do not store passwords in plain text. Instead, compare hashed passwords.
            // You can use a library like bcryptjs for this purpose.

            return done(null, user);
        } catch (err) {
            console.log('Error in finding user --> Passport', err);
            return done(err);
        }
    }
));


  //serializing user function =>  the user to decide which key is kept into the cookies
  passport.serializeUser(function(user,done){
    done(null,user.id);
  });

  //deserializing the user form the key in the cookies
    passport.deserializeUser(async function (id, done) {
      try {
          const user = await User.findById(id).exec();
          if (!user) {
              return done(null, false, { message: 'User not found.' });
          }
          return done(null, user);
      } catch (err) {
          console.log('Error in finding user --> Passport', err);
          return done(err);
      }
  });

  //CHECK IF USER IS AUTHENTICATED
  passport.checkAuthentication  = function(req,res,next) {  //function make by us & it's middleware becuase it has all three arguments
    //if user is signed in , then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/user/signIn');
  }

  passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for views
        res.locals.user = req.user;
    }
    next();
  }


  module.exports = passport;
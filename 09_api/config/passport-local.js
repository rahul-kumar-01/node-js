const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userSchema');

const app = express();

passport.use(new LocalStrategy({
    usernameField: 'userEmailId', // Specify the field to be used as username
    passwordField: 'userPassword', // Specify the field to be used as password
    passReqToCallback : true
},
    // async function (userEmailId, userPassword, done) {
    async function (req,userEmailId, userPassword, done) {  //after passReqToCallback : true,
        try {
            const user = await User.findOne({ userEmailId: userEmailId });
            if (!user || user.userPassword != userPassword) {
                req.flash('error','Invalid UserName/Password');
                // return done(null, false, { message: 'Invalid email or password.' });
                return done(null,false);
            }
            return done(null, user);
        } catch (err) {
            req.flash('error',err);
            // console.log('Error in finding user --> Passport', err);
            return done(err);
        }
    }
));


//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user form the key in the cookies to establish which user is this (check in database)
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


passport.checkAuthentication  = function(req,res,next) {  
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('back');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;


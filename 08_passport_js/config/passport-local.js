const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userSchema');

//authentication using passport
//Tell passport to use LocalStrategy

passport.use(new LocalStrategy({
    usernameField: 'userEmailId', // Specify the field to be used as username
    passwordField: 'userPassword', // Specify the field to be used as password
    passReqToCallback : true        //this allow us to set first argument as request(req)

    // we are using this becuase of noty when user got signIn pasport.autheticate() called from route  and
    // we have to add flash message to req
},
    // async function (userEmailId, userPassword, done) { //this is callback function
    async function (req,userEmailId, userPassword, done) {  //after passReqToCallback : true,
        try {
            //find the user and established the identity
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
//when LocalStrategy is called passport.use () called userEmailId and userPassword is passed on +
//done is inbuilt to passport and it is automatically called
//done check whether is request is successfull handle by this
//serializing the user to decide which key is to be kept in the cookies
//done takes two arguments first is err and second is success status but becuase it's js it will run on
//  one argument also like done (err)  or two argument done(err,false)  //error found authetication is false
// if user found return done(null,user);


// serializeUser function means when we are authenticate the user using manual authentication
// you are taking out id and putting into the cookie
// this is basically telling that you need to put in the userId into the cookie not the rest of
// information because that is the only thing  we need to encrypted

// on the other side when the cookie is been sent back to the server and we are  establishing  the  identity
// which user is there from dattbase we are using that id to find the user that is called deserializeUser function


//serializing the user to decide which key is to kept in the cookies  //inbuilt function
//we can write callback function or done , but becuase passport use done so we are using done
passport.serializeUser(function(user,done){
    done(null,user.id);  //user.id stored in encrypted form automatically
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

//find the user
//store the cookie
//when next request is come we need to desiarlize the user
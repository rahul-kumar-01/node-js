const express = require('express');
const route = express.Router();
const userControllers = require('../controllers/userController');
const passport = require('passport');





route.get('/signIn',userControllers.signIn);
route.get('/signUp',userControllers.signUp);


route.post('/createUser',userControllers.createUser);

// // route.post('/createSession',userControllers.createSession);


route.post('/createSession',passport.authenticate(
    'local',
        {failureRedirect: '/user/signIn'},
), userControllers.createSession);


route.get('/profile',passport.checkAuthentication,userControllers.profile);
route.get('/profile/:id',passport.checkAuthentication,userControllers.profile);
route.post('/update/:id',passport.checkAuthentication,userControllers.update);
route.get('/signOut',userControllers.signOut);

route.get('/forget-password',userControllers.forgetPassword);
route.post('/send-access-token',userControllers.sendAccessToken);
route.get('/reset-password',userControllers.resetPassword);
route.post('/auth-reset-password',userControllers.authResetPassword);

route.get('/auth/google',passport.authenticate('google',{scope: ['profile','email']}));
route.get('/auth/google/callback', passport.authenticate('google',{failureRedirect: '/user/signIn'}),userControllers.createSession);

module.exports = route;
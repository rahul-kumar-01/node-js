const express = require('express');
const route = express.Router();


const userController = require('../controllers/userController');
const passport = require('passport');

route.get('/',userController.user);

// route.get('/profile',passport.checkAuthentication,userController.profile);
route.get('/signIn',userController.signIn);
route.get('/signUp',userController.signUp);
// route.post('/create',userController.create);
// route.post('/createSession',userController.createSession);


//use passport as middleware to authenticate
route.post('/createSession',passport.authenticate(
    'local',
        {failureRedirect: '/user/signIn'},
    
), userController.createSession);

// route.get('/signOut',userController.destroySession);

module.exports = route;



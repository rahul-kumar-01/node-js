const express = require('express');
const route = express.Router();


const userController = require('../controllers/userController');

route.get('/',userController.user);
route.get('/profile',userController.profile);
route.get('/signIn',userController.signIn);
route.get('/signUp',userController.signUp);
route.post('/create',userController.create);
route.post('/createSession',userController.createSession);


module.exports = route;
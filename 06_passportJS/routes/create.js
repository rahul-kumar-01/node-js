const express = require('express');
const route = express.Router();
const passport = require('passport');

const postController = require('../controllers/postController');
route.post('/create',passport.checkAuthentication,postController.create);



module.exports = route;
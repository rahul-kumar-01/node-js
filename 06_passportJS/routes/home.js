const express = require('express');
const route = express.Router();

const homeController = require('../controllers/homeController');
route.get('/',homeController.home);

route.use('/user',require('./user'));
route.use('/comments',require('./comments'));

const postController = require('../controllers/postController');
route.use('/post',require('./create'));

module.exports = route; 
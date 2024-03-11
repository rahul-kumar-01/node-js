const express = require('express');
const route = express.Router();

const homeController = require('../controllers/homeController');
route.get('/',homeController.home);

route.use('/user',require('./user'));

module.exports = route;
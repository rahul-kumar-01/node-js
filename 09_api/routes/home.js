const express = require('express');
const route = express.Router();
const homeControllers = require('../controllers/homeController');

const app = express();
app.use(express.static('./assets'));


route.get('/',homeControllers.home);

route.use('/user',require('./user'));

route.use('/post',require('./post'));
route.use('/comment',require('./comment'));




module.exports = route;
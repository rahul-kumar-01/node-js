const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();


// Use the cookie-parser middleware
app.use(cookieParser());

const db = require('./config/mongoose');
const User = require('./models/userSchema');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false})); 

app.set('view engine','ejs');
app.set('views','./views');
app.use('/',require('./routes/home'));

app.listen(port,function(err){
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Express fired on port : ${port}`);
})






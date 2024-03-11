const express = require('express');
const port = 8000;
const app = express();
const cookieParser = require('cookie-parser');


// SASS
// const nodeSaasMiddleware = require('node-sass-middleware');
// app.use(nodeSaasMiddleware({
//     src: './assets/scss',        
//     dest: './assets/css',     
//     debug: true,               
//     outputStyle: 'extended',    
//     prefix: '/css',             
// }));


// Layout
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



// //used for session cookies 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const MongoStore = require('connect-mongodb-session')(session);

app.use(cookieParser());


//Flash Messages => require flash & middleware 
const flash = require('connect-flash');
const customMware = require('./config/middleware');




const db = require('./config/mongoose');
const User = require('./models/userSchema');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));


// monogo store is used to store session cookie in the db
app.use(session({
    name: 'codeial',
    //TODO : change the secret before deployment in the production,
    secret : 'blahblah',
    saveUninitialized : false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100),
    },
    store: new MongoStore({
        mongooseConnection : db,
        autoRemove : 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    }),
}
));

//using flash message after the cookies set up 
app.use(flash());
app.use(customMware.setFlash);


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


//if any reqest is coming in the user will set in locals

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static('./assets'));

app.use('/user', express.static('./assets'));
app.use('/user/profile', express.static('./assets'));

app.use('/',require('./routes/home'));



app.listen(port,function(err){
    if(err){
        console.log(err);
    }
    console.log(`Express fired on port : ${port}`);
})
const express = require('express');
const port = 8000;
const app = express();


const cookieParser = require('cookie-parser');

//for layout install npm install express-ejs-layouts
//use it by express and come in work before the route work start because layout updated before controller
//extract sytle and script from subpages into layout 

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
// after using this layout.ejs(name is same) apply to all ejs file inside the body tag 



const db = require('./config/mongoose');
const User = require('./models/userSchema');

//used for session cookies 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const MongoStore = require('connect-mongodb-session')(session);

app.use(cookieParser());   //use before the router
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));  //install body parser   (middleware) npm install body-parser



app.set('view engine','ejs');
app.set('views','./views');


//monogo store is used to store session cookie in the db
app.use(session({
    name: 'codeial',
    //TODO : change the secret before deployement in the production,
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


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
//if any reqest is coming in the user will set in locals


app.use('/',require('./routes/home'));

app.listen(port,function(err){
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Express fired on port : ${port}`);
})


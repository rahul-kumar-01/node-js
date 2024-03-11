const express = require('express');
const port = 8000;
const app = express();

app.set('view engine','ejs');
app.set('views','./views');

//install body parser then  (middleware)
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//for static files
app.use(express.static('static'));

//MiddleWare for every router it get's called 

app.use(function(req,res,next){
    console.log('middleware 1 is called');
    next();
});

app.use(function(req,res,next){
    console.log('middlware 2 is called');
    next();
})



app.get('/',function(req,res){
    return res.render('home.ejs',{
        contactList : contactList,
    });
    // return res.send('<h1>hello</h1>');
});


app.post('/createContact',function(req,res){


    contactList.push(req.body);
    return res.redirect('back');


    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phoneNo);
})

app.get('/deleteContact/',function(req,res){
    // console.log(req.params);
    let phone = req.query.phone;

    let contactIndex = contactList.findIndex(contact => contact.phoneNo == phone);
    if(contactIndex != -1){
        contactList.splice(contactIndex,1);
    }
    return res.redirect('back');
});



var contactList = [
    {
        name : "Rahul Kumar",
        phoneNo : "6299563118"
    },
    {
        name : "Garv Sharma",
        phoneNo : "8789842930"
    }
]



app.listen(port,function(err){
    if(err){
        console.log("Error is found");
    }
    console.log(`Express fired successfully on port : ${port}`);
});

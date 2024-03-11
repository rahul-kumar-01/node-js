const express = require('express');
const port = 8000;
const app = express();
const path = require('path');


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));



app.get('/',function(req,res){
    return res.render('home',{
        title: 'ejs Title'
    });

    // res.send('<h1>Cool, it is running or is it?</h1>');
})

app.listen(port,function(err){
    if(err){
        console.log("Error is fired");
    }
    console.log(`Express fired on port : ${port}`);
})


// in res object there is key locals in which titile and all the response passed 
// in ejs file we can use title or locals.title 
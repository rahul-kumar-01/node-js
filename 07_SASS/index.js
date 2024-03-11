const express = require('express');
const nodeSassMiddleware = require('node-sass-middleware');
const port = 8000;
const saasMiddleware = require('node-sass-middleware');
const app = express();


app.use(saasMiddleware({
    src: './assets/scss',        // where sass files stored 
    dest: './assests/css',       // converted files stored in
    debug: true,                // when converting debug the code and show error, in development stage it's false
    outputStyle: 'extended',    // convert the output file in extended not in compressed manner
    prefix: '/css',             // whenever we access '/css/home.css' 
}));


// NOTE: whenever we load the page then scss file converted to css and dont forget to './'

app.listen(port,function(err){
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Express fired up successfully on port : ${port}`);
})


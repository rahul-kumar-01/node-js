const http = require('http');
const port = 8000;
const fs = require('fs');       // fs module is used to read and write files


function requestHandeler(req,res){
    console.log(req.url);
    res.writeHead(200,{'content-type':'text/html'});         // set this header to tell browser that we are sending html file for text we use text/plain or no need to set header for text

    fs.readFile('./index.html',function(err,data){
        if(err){
            console.log(`Error : ${err}`);
            return;
        }
        return res.end(data);
    });



    // res.end('<h1>Gotcha!</h1>');
}

const server = http.createServer(requestHandeler);    // request hanlder come in action when server is created and called when request is made

server.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log(`HTTP is fired on port : ${port}`);
})


// res.writeHead(200, {'content-type': 'text/html'});

// Sends a response header in the form of a status code along with the exact header message.
// Here 200 is a status code and content-type: 'text/html'  we usually give two options text and HTML,
// a standard browser protocol defined. Also, some browsers might not be rendering everything,
// so either renders as text and recognises this.

// Access code :
// 403  HTTP status code signifies the client does not have access rights to the content
// 200 Successfully run

//  'appendFile' function of 'fs' module? create a file if not exist

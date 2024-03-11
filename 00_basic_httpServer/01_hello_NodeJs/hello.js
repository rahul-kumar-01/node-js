// Node JS is runtime environment over the js, and run using chrome V8 engine implemented on c++

console.log("Hello World");

function add(a,b){
    return a+b;
}

console.log(add);
console.log(add());     //NaN
console.log(add(2,8));

console.log(process.argv);      // if we run node hello.js 2 8 then it will print [path where nodjs is running, path of file run by node.js, arguments by default converted to string  ] [ 'C:\\Program Files\\nodejs\\node.exe', 'C:\\Users\\hp\\Desktop\\NodeJs\\00_basic_httpServer\\01_hello_NodeJs\\hello.js', '2', '8' ]

var temp = process.argv.slice(2);
console.log(process.argv);
console.log(temp);

console.log(add(parseInt(temp[0]),parseInt(temp[1])));


// Terminal
// cd .. move to parent folder , pwd display the current directory mkdir make directory
// cd ~/Desktop/ move to desktop rm remove the directory or folder or file

// The process object in Node. js is a global object that can be accessed inside any module without requiring it. 
// command line passes some argument with file we can access that in global object called process
// process.argv it looks over the complete environment that the node file is running in and all the
// argument passed to the file

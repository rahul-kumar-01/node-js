module.exports.home = function(req,res){
    console.log(req.cookies);               //for printing cookies
    res.cookie('Name',20);                  //for changing cookies values
    return res.render('home');
    // return res.send('Home');
}


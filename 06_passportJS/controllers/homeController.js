const Post = require("../models/post");

module.exports.home = async function(req, res) {
    try {
        const posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })
            .exec();

        return res.render('home', {
            title: "Codeial : Home",
            posts: posts,
        });
    } catch (err) {
        console.error(err);
        // Handle the error appropriately
        return res.status(500).send('Internal Server Error');
    }
}


  // console.log(req.cookies);               //for printing cookies
    // res.cookie('Name',20);                  //for changing cookies values
    // return res.render('home');
    // // return res.send('Home');


  


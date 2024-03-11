const User = require('../models/userSchema');
const Post = require('../models/postSchema');

module.exports.home = async function(req, res) {
    try {
        const posts = await Post.find({})
            .sort('-createdAt')
            .populate('userId')
            .populate({
                path: 'commentsArray',
                populate: {
                    path: 'userId'
                }
            })
            // .exec();

        const allUsers = await User.find({});

        return res.render('home', {
            title: "Codeial : Home",
            all_posts: posts,
            all_users: allUsers,
        });
        
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
}


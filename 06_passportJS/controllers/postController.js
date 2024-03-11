const Post = require('../models/post'); // Import the Post model

module.exports.create = async function(req, res) {
    try {
        console.log(req.body);

        const post = await Post.create({
            content: req.body.content,
            user: req.user._id,
        });

        console.log('Post created:', post);

        return res.redirect('back');
    } catch (err) {
        console.error('Error in creating a post:', err);
        return res.status(500).send("Internal Server Error");
    }
};

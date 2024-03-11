const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res) {
    try {
        console.log(req.body.post);
        const post = await Post.findById(req.body.post);
        console.log("ere");
        if (post) {
            const comment = await Comment.create({
                
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            console.log(comment);
            post.comments.push(comment);
            await post.save();

            res.redirect('/');
        } else {
            // Handle the case where the post was not found
            res.status(404).send('Post not found');
        }
    } catch (err) {
        console.error(err); // Handle the error appropriately
        res.status(500).send('Internal Server Errorss');
    }
}

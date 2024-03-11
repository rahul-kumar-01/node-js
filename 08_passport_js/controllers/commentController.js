const Comment = require('../models/commentSchema');
const Post = require('../models/postSchema');
const User = require('../models/userSchema');
const { post } = require('../routes/user');

module.exports.create = async function(req, res) {
    try {
        // console.log(req.body.post);
        const post = await Post.findById(req.body.postId);
        // console.log("ere");
        if (post) {
            const comment = await Comment.create({
                
                content: req.body.content,
                postId: req.body.postId,
                userId: req.user._id
            });
            console.log(comment);
            post.commentsArray.push(comment);
            await post.save();

            res.redirect('/');
        } else {
            res.status(404).send('Post not found');
        }
    } catch (err) {
        console.error(err); // Handle the error appropriately
        res.status(500).send('Internal Server Errorss');
    }
}


module.exports.destroy = async function(req, res) {
    const comment = await Comment.findById(req.params.id);
    console.log(req.params.id);

    if (!comment) {
        return res.redirect('back');
    }
    
    let postId = comment.postId;
    console.log(postId);
 
        
    const post = await Post.findById(postId);
    console.log(post.user);
    

    if (comment.userId == req.user.id  || post.userId == req.user.id) {
        const postId = comment.postId;
        await comment.deleteOne();
        await Post.findByIdAndUpdate(postId, { $pull: { commentsArray: req.params.id } });
        return res.redirect('back');
    } else {
        return res.redirect('back');
    }

};



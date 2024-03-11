const Post = require('../models/postSchema'); 

const Comment = require('../models/commentSchema');

module.exports.create = async function(req, res) {
    try {
        console.log(req.body);

        let post = await Post.create({
            content: req.body.content,
            userId: req.user._id,
        });

        //If ajax request come in picture then this function executes and return
         
        if(req.xhr){
            post = await post.populate('userId','userName');    // This is important line of code help console for understant
            return res.status(200).json({
                data:{
                    post: post,
                },
                message: "Post Created"
            })
        }
        console.log('Post Published:', post);
        req.flash('success','Post Published!');
        return res.redirect('back');

    } catch (err) {

        // console.error('Error in creating a post:', err);
        req.flash('error',err);

        // return res.status(500).send("Internal Server Error");
        return res.redirect('back');
    }
};


module.exports.destroy = async function(req, res) {
    try {
        const post = await Post.findById(req.params.id);
        console.log(req.params.id);
        console.log(post.userId);
        console.log(req.user.id);

        if (!post) {
            return res.redirect('back');
        }

        if (post.userId.toString() === req.user.id) {
            // await Post.deleteOne({});    //both works's
            await Post.deleteOne({ _id: req.params.id });    
            await Comment.deleteMany({ postId: req.params.id });

            if(req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"

                })
            }


            req.flash('success','Post and associated comments deleted');
            return res.redirect('back');
        } else {
            req.flash('error','You cannot delete this post!');
            return res.redirect('back');
        }
    } catch (err) {
        console.error(err); // Handle the error appropriately
        req.flash('error',err);
        return res.redirect('back');
    }
};
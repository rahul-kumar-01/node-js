const Post = require('../../../models/postSchema');
const Comment = require("../../../models/commentSchema");

module.exports.index = async function(req,res){

    const posts = await Post.find({})
        .sort('-createdAt')
        .populate('userId')
        .populate({
            path: 'commentsArray',
            populate: {
                path: 'userId'
            }
        });


    return res.json(200,{
        message: "List Of Posts",
        posts: posts,
    })
}


module.exports.destroy = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if (post.userId.toString() === req.user.id) {
            // Delete the post and associated comments
            await Post.deleteOne({ _id: req.params.id });
            await Comment.deleteMany({ postId: req.params.id });

            return res.status(200).json({
                message: "Post and associated comments deleted successfully"
            });
        } else {
            return res.status(401).json({
                message: "You cannot delete this post"
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};



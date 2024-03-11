const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    commentsArray:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ] 
},{
    timestamps : true
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;
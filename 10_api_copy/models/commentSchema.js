const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required : true,
    },


    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },


    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }
},{
    timestamp: true,
})

const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;






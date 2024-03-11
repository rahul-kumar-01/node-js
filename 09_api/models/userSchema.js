const mongoose = require('mongoose');

//multer
const path = require('path');
const multer = require('multer');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    userEmailId: {
        type: String,
        required: true,
        unique: true,
    },
    userPassword:{
        type: String,
        required : true,
    },
    userName:{
        type: String,
        required: true,
    },avatar:{
        type: String,
    }

});

let storage = multer.diskStorage({
    destination:function(req,res,cb){                       //where the file is going to store
        cb(null,path.join(__dirname,'..',AVATAR_PATH));     //path .join convert address to string form
    },
    filename: function(req,file,cb){            // if name of file is same we append => current time which is changed in millisecond 
        cb(null,file.fieldname+'-'+Date.now());  //fieldname is avatar every file name is stored as avatar_date.now()
    }
})

// Define a function to check if the uploaded file is a JPEG
const fileFilter = function (req, file, cb) {
    if (file.mimetype.startsWith('image/jpeg')) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only JPEG files are allowed!'), false); // Reject the file
    }
};





//static function => which can call on overall class , make there function pulblically available 
userSchema.statics.uploadedAvatar = multer({storage:storage,fileFilter: fileFilter }).single('avatar');
// store a single file of filename avatar link multer storage to storage key 
//to access this function 
// userSchema.uploadedAvatar;

userSchema.statics.avatarPath = AVATAR_PATH;





const User = mongoose.model('User', userSchema);
module.exports = User;

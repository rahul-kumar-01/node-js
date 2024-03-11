const User = require('../models/userSchema');
const fs = require('fs');
const path = require('path');
const {contentDisposition} = require("express/lib/utils");
const RandomToken = require('../models/randomTokenSchema');

module.exports.signIn = (req,res)=>{
    try {
        if (req.isAuthenticated()) {

            return res.redirect('/');
        }
        return res.render('signIn', { layout: false });
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports.signUp = (req,res)=>{
    try{
        if (req.isAuthenticated()) {
            return res.redirect('/');
        }
        return res.render('signUp');
    }catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}


module.exports.createUser = async function(req, res) {
    try {
        if(req.body.confirmUserPassword == req.body.userPassword){
            const user = await User.create({
                userEmailId: req.body.userEmailId,
                userPassword: req.body.userPassword,
                userName: req.body.userName,
            });
            return res.render('signIn');
        }
        return res.redirect('back');
    } catch (err) {
        console.error('Error in creating a post:', err);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports.createSession = async function(req,res){
    req.flash('success', 'You have LogIn Successfully');
    return res.redirect('/');
}

// module.exports.createSession = async function(req,res){
//     try{
//         const user = await User.findOne({ userEmailId: req.body.userEmailId });
//         if(user){
//             if (user.userPassword != req.body.userPassword) {
//                 return res.redirect('back');
//               }
              
//              res.cookie('codeial', user.id);
//               return res.redirect('profile');
               
//         }else{
//             return res.redirect('back');
//         }
        
//     }catch(err){
//         console.log(err);
//         return;
//     }
// }



// module.exports.profile = async function(req,res){
//     // try{
//     //     let userIdCookie = (req.cookies.userIdCookie);
//     //     console.log(userIdCookie);
//     //     if(!userIdCookie){
//     //         return res.redirect('/signIn');
//     //     }
//     //     const user = await User.findById(userIdCookie);
//     //     return res.render('profile',{
//     //         user : user,
//     //     })
//     // }catch(err){
//     //     return res.redirect('/signIn');
//     // }
    
//     try{
//         if (req.isAuthenticated()) {
//             return res.render('profile');
//         }
//         return res.redirect('/user/signIn');
//     }catch{
//         return res.redirect('back');
//     }
// }

module.exports.profile = async function(req, res) {
    
    try {
        const user = await User.findById(req.params.id).exec();
        return res.render('profile', {
            title: 'User Profile',
            profile_user: user
        });
    } catch (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    
  
};





module.exports.signOut = async function(req,res){
    // 1st Method : we are trying to clear the cookies 
    // try{
    //     console.log("signOut");
    //     res.clearCookie('codeial');
    //     return res.redirect('/user/signIn');
    // }catch(err){
    //     return res.redirect('signIn');
    // }


    // 2nd Method : cookie id got expired , it's not clear the cookie 
    // Using the req.logout() function provided by passport.js to log out the user
   

    try {
        req.logout(function(err) {
            if (err) {
                console.error('Error during logout:', err);
            }
            req.flash('success', 'You have logged out successfully');
            return res.redirect('/');
        });
    } catch (error) {
        console.error('Error during sign out:', error);
        req.flash('error', 'An error occurred during sign out');
        return res.redirect('/');
    }
}

module.exports.update = async function(req, res) {

    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log("***Multer Errr : err");
                }
                // console.log(req.file);

                user.userName = req.body.userName;
                user.userEmailId = req.body.userEmailId;
                console.log(user.avatar);

                if(req.file){

                    //if file already exist remove the previous file

                    const filePath = path.join(__dirname,'..',user.avatar);
                    const check = checkFileExists(filePath);
                    if(check){
                        if(user.avatar){
                            fs.unlinkSync(path.join(__dirname,'..',user.avatar));  //user.avatar = /uploads/.....
                        }
                    }



                    // this is saving the path of the upploaded file into the avatar field in the user 
                    user.avatar = User.avatarPath + '/' + req.file.filename; 
                }
                user.save();
                return res.redirect('back');
            })
        }catch(err){
            req.flash('error',err);
            return req.redirect('back');
        }
    }
  };

function checkFileExists(filePath) {
    try {
        // Check if the file exists by trying to access its stats
        console.log("File exist checked");
        fs.statSync(filePath);
        return true;
    } catch (err) {
        // If an error occurs, it means the file doesn't exist
        if (err.code === 'ENOENT') {
            console.log("File not existed")
            return false;
        }
        // Handle other errors
        throw err;
    }
}

module.exports.forgetPassword = function(req,res){
    return res.render('forgetPassword',{layout:false});
}

const forgetPasswordMailer = require('../mailers/forget_password_mailer');
const Post = require("../models/postSchema");
module.exports.sendAccessToken = async function(req, res) {
    try {
        console.log(req.body.emailId);
        const user = await User.findOne({userEmailId: req.body.emailId});
        if (user) {
            const userToken = {
                userId: user._id,
            };
            let newUserToken = new RandomToken(userToken);
            await newUserToken.save();
            await newUserToken.populate('userId');
            console.log(newUserToken);
            forgetPasswordMailer.forgetPasswordToken(newUserToken);
        }
        return res.render('signUp');
    } catch (error) {
        console.log(error);
        return res.render('signUp');
    }
};
module.exports.resetPassword = async function (req, res) {
    const accessToken = req.query.accessToken;
    console.log(accessToken);

    try {
        // Find the random token in the database.
        const randomToken = await RandomToken.findOne({ accessToken: accessToken });

        // Check if the find operation was successful.
        console.log(randomToken);
        if (randomToken === null || randomToken === undefined || randomToken.isValid === false) {
            // The random token was not found.
            return res.send('Invalid access token');
        }

        // randomToken.isValid = false;
        randomToken.save();
        console.log(randomToken.userId);
        let user = await User.findOne({_id : randomToken.userId});

        return res.render('reset-password',{
            user: user,
            layout:false,
        });
    } catch (error) {
        // Handle the error.
        console.log(error);
        return res.send('An error occurred while resetting your password');
    }
};

module.exports.authResetPassword = async function(req, res) {


    try {

        if (req.body.resetPassword === req.body.confirmResetPassword) {
            let userId = req.query.user;
            console.log(userId);
            const user = await User.findOne({_id: userId});
            console.log(user);
            console.log(req.body.resetPassword);
            user.userPassword = req.body.resetPassword;
            user.save();
            if (user) {
                return res.redirect('/user/signIn')
            }
        }
        return res.send('user not found');
    } catch (error) {
        console.log(error);
        // Handle the error here
    }
};

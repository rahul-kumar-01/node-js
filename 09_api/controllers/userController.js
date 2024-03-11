const User = require('../models/userSchema');
const fs = require('fs');
const path = require('path');

module.exports.signIn = (req,res)=>{
    try {
        if (req.isAuthenticated()) {

            return res.redirect('/');
        }
        return res.render('signIn');
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
const db = require('../config/mongoose');
const User = require('../models/userSchema');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongodb-session');

module.exports.profile = function(req,res){
  console.log(req.user);
  return res.render('profile',{
    title: 'User Profile',
  })
}



module.exports.signIn = function(req, res) {
  try {
    if (req.isAuthenticated()) {
      return res.redirect('profile');
    }

    return res.render('signIn');
  } catch (error) {
    return res.status(500).send(error);
  }
};

// module.exports.signIn = function(req,res){

//   if(req.isAuthenticated()){
//     return res.redirect('profile');
//   }
//     return res.render('signIn');
// }

module.exports.signUp = function(req,res){

  if(req.isAuthenticated()){
    return res.redirect('profile');
  }

    return res.render('signUp');
}

module.exports.user = function(req,res){
    return res.send('<h1> User </h1>');
}


module.exports.create = async (req, res) => {
    if (req.body.password !== req.body.confirmPassword) {
      return res.redirect('back');
    }
  
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.redirect('back');
    }
  
    const newUser = await User.create(req.body);

    return res.redirect('/user/signIn');
  };


// module.exports.createSession = async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return res.redirect('back');
//   }

//   if (user.password != req.body.password) {
//     return res.redirect('back');
//   }
  
//   res.cookie('userId', user.id);
//   return res.redirect('profile');
// };

module.exports.createSession = function(req,res){
  return res.redirect('/user/profile'); 
}

//get up the sign up data
// module.exports.create = function(req,res){
//     if(req.body.password != req.body.confirmPassword){
//         return res.redirect('back');
//     }
//     User.findOne({email:req.body.email},function(err,user){
//         if(err){console.log(`error in finding user in signing up `); return; }

//         if(!user){
//             User.create(req.body,function(err,user){
//                 if(err){ console.log(`error in creating user while signing up`); return ; }
//                 return res.redirect('/user/signIn');
//             })
//         }else{
//             return res.redirect('back');
//         }
//     })
// }

//sign in and create a session for the user 
// module.exports.createSession = function(req,res){

//     //steps to authenticate
//     //find the user

//     User.findOne({email: req.body.email},function(err,user){
//       if(err){console.log(`error in finding user in singing in `); return;}

//       //handle user found 
//       if(user){

//         //handle password which don't match 
//         if(user.password != user.body.password){
//           return res.redirect('back');
//         }

//         //handle session creation
//         res.cookie('userId',user.id);
//         return res.redirect('back');
//       }

//       //handle user not found
//       else{
//         return res.redirect('back');
//       }
//     })   
// }



//Sign Out

// TEACHER:::
//  module.exports.destroySession = function(req,res){
//     req.logout();               // given by passport . js 
//     return res.redirect('/');
//  }

 module.exports.destroySession = function (req, res) {
    // Using the req.logout() function provided by passport.js to log out the user
    req.logout(function (err) {
      if (err) {
        console.error('Error during logout:', err);
      }
      // Redirecting the user to the root URL after logout
      return res.redirect('/');
    });
  };

const db = require('../config/mongoose');
const User = require('../models/userSchema');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongodb-session');

module.exports.user = function(req,res){
  return res.render('home');
}

module.exports.profile = async (req, res) => {
  const userId = req.cookies.userId;
  console.log(req.cookies.userId);
  if (!userId) {
    console.log("rahul");
    return res.redirect('/user/signIn');
  }

  const user = await User.findById(userId);
  if (!user) {

    return res.redirect('/user/signIn');
  }
  console.log("rahul2");
  res.render('profile', {
    title: 'Profile Details',
    user: user,
  });
};


module.exports.signIn = function(req,res){
    return res.render('signIn');
}

module.exports.signUp = function(req,res){
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


module.exports.createSession = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.redirect('back');
  }

  if (user.password != req.body.password) {
    return res.redirect('back');
  }
  
  res.cookie('userId', user.id);
  return res.redirect('profile');
};



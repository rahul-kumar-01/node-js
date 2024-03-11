const User = require('../../../models/userSchema');
const jwt = require('jsonwebtoken');
const {expires} = require("express-session/session/cookie");

module.exports.createSession = async function(req,res){
    try{
        let user = await User.findOne({userEmailId: req.body.userEmailId});

        if(!user || user.userPassword != req.body.userPassword){
            return res.json(422,{
                message: "Invalid username or password"
            })
        }

        return res.json(200,{
            message: 'Sign in successfully , here is your token , please keep it safe',
            data:{
                token: jwt.sign( user.toJSON() , 'codeial', { expiresIn: '1000000' })
            }
        })

    }
    catch (err){
        console.log("****",err);
        return res.json(500,{
            message : "Internal Server Error"
        })
    }
}
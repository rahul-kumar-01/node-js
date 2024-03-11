const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.forgetPasswordToken = (newUserToken) => {
    // console. log('inside newcomment mailer', comment);
    let htmlString = nodeMailer.renderTemplate({newUserToken: newUserToken}, '../mailers/forgetPassword/forget_password.ejs');

    nodeMailer.transporter.sendMail({
        from: 'mysthyper01@gmail.com',
        to: newUserToken.userId.userEmailId,
        subject: "Password Reset",
        // html: '<h1>Yup, your comment is now published!</h1>'
        html: htmlString,
    }, (err, info) => {
        if (err){
            console. log('Error in sending mail', err);
            return;
        }
        console. log('Message sent', info);
        return;
    });
}
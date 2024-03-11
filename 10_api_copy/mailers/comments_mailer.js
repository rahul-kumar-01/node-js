const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment = (comment) => {
    // console. log('inside newcomment mailer', comment);
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '../mailers/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'mysthyper01@gmail.com',
        to: comment.userId.userEmailId,
        subject: "New Comment Published!",
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
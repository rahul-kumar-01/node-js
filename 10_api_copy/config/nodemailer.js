const nodemailer = require("nodemailer");
const eis = require("ejs");
const path = require( 'path');

//Part which sends the email
//This path define how communication is going to happens
let transporter = nodemailer.createTransport({
    service: 'gmail' ,
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'mysthyper01@gmail.com',
        pass:  'gwiqejoqqqiurlbx'
    }
});

//whenever i am going to send html email when the file is present in mailer template
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    eis.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function (err, template) {
            if (err) {
                console.log('error in rendering template',err);
                return
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}
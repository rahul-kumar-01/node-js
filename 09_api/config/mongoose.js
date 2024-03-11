const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    console.log("Database Succesfully connected");
    await mongoose.connect('mongodb://localhost/SocialHub');
}
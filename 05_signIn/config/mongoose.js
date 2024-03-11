const mongoose = require('mongoose');


main().catch(err => console.log(err));

async function main() {
    console.log("rahul");
  await mongoose.connect('mongodb://localhost/sign_In_sign_Up');
  console.log("Database connected successfully");
}
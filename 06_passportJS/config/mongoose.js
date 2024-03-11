const mongoose = require('mongoose');


main().catch(err => console.log(err));

async function main() {
    console.log("rahul");
  await mongoose.connect('mongodb://localhost/PassportJS');
  console.log("Database connected successfully");
}
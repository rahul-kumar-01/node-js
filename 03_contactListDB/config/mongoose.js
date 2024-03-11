const mongoose = require('mongoose');


main().catch(err => console.log(err));

async function main() {
    console.log("rahul");
  await mongoose.connect('mongodb://localhost/contact_list_db');
  console.log("Database connected successfully");
}
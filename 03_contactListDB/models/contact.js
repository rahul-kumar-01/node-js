const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  phoneNo:{
    type : String,
    required: true,
  }
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;

//Contact is similar to contactList of array of objects
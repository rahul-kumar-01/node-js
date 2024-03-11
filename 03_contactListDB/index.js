const express = require('express');
const port = 8000;
const app  = express();

const db = require('./config/mongoose');
const Contact = require('./models/contact');   // Contact is models ( collection of documents (collection of fields))

app.set('view engine','ejs');
app.set('views','./views');

//install body parser then  (middleware) npm install body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//for static files
app.use(express.static('static'));




app.get('/',function(req,res){
    Contact.find().then((contacts) => {
        try{
            return res.render('home',{
                title: "contactList",
                contactList : contacts,
            })
        }
        catch(err){
            console.log("error");
        }
    })
});


app.get('/deleteContact', async function(req, res) {
    console.log("rahul");
  
    // Get the ID from query in the URL
    let id = req.query.id;
  
    // Define the asynchronous function to find and delete the contact
    async function findByIdAndDelete(id) {
      try {
        const result = await Contact.findByIdAndDelete(id);
        console.log('Deleted document:', result);
        res.redirect('back');
      } catch (error) {
        console.error('Error deleting document:', error);
        // Handle the error accordingly
      }
    }
  
    // Call the asynchronous function to delete the contact
    await findByIdAndDelete(id);
  });
  


app.post('/createContact',function(req,res){

    const createContacts = async()=>{
    // async function createContacts(){
        try{
            
            const temp1 = new Contact({
                name: req.body.name,
                phoneNo : req.body.phoneNo,
            })
            const result = await temp1.save();
            console.log(result);
            return res.redirect('back');
        }
        catch(err){
            console.log("error comes");
            throw err;
        }
    }
    createContacts();
});







app.listen(port,function(err){
    if(err){
        console.log("Error");
    }
    console.log(`Express fired on port : ${port}`);
})
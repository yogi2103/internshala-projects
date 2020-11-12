//Requiring the mongoose library
const mongoose=require('mongoose');

//Connecting to database
mongoose.connect('mongodb://localhost/ToDoAPP_db');

//Checking establishment of connection
const db=mongoose.connection;

//For checking error
db.on('err',console.error.bind(console,'error connecting to database!'));

//For Successfull Connection
db.once('open',function(){
    console.log("Succesfull Connection!");
})
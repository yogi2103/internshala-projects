const express= require('express');
const app=express();
const path=require('path');
const port=8000;

app.set('view engine','ejs');   
app.set('views',path.join(__dirname,'views'));      //it will join my current directory with folder name specified

//For encoding
app.use(express.urlencoded());

//For using static files
app.use(express.static('./assets'));

//FOr view engine as ejs
app.set('view engine','ejs');
app.set('views','./views');

app.get('/',function(req,res){              //This is telling me about the home page
        return res.render('home',{
            title: "API dictionary"
        });
});

//To check if the server is running successfully or not
app.listen(port,function(err){
    if(err){
        console.log(`error in Server!: ${err}`);
    }
    console.log(`Server is Running on port: ${port}`);
})
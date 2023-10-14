// get Expres
const express = require('express');
const port = 5000;

// to create routes and the server it self 
const app = express() ; 


//create the server 
app.listen(port , () => console.log(`Server Listening on Port${port}`)); 

// create Routes 
// Route 1 
app.get('/' , (req, res)=> {
    // res.send({message:"Hello World"}) ; // will send JSON 
    res.json({message:"Welcom to Random Idea API"}) ;
}); 


// Link the /Api/ideas

const ideasRouter = require('./routes/ideas')
// app.use("EndPoint", "Linked Location" )
app.use('/api/ideas' ,ideasRouter ) ;  // this is how we link 
const path = require('path');
// get Expres
const express = require('express');
// enable cors and localHost/3000
const cors = require('cors');

require('dotenv').config();
const port = process.env.PORT || 5000;
// get the Connection DB from  the db file
const connectDB = require('./config/db');

connectDB(); // invoke the Connect DB

// to create routes and the server it self
const app = express();

// static folder
app.use(express.static(path.join(__dirname, 'public'))); //
// body Parser MiddleWare
app.use(express.json()); // will allow us to send raw json data to the server (the server )
app.use(express.urlencoded({ extended: false })); // this is the common way to do it

// cors middleware
// app.use(cors); // this is not good it will enable request form anywhere

app.use(
  cors({
    // enbled URL that allowed to route to the server on both envoirment , dev and production
    origin: ['http://localhost:3000', 'http://localhost:5000'],
    credentials: true,
  })
);
//create the server
app.listen(port, () => console.log(`Server Listening on Port${port}`));

// create Routes
// Route 1
app.get('/', (req, res) => {
  // res.send({message:"Hello World"}) ; // will send JSON
  res.json({ message: 'Welcom to Random Idea API' });
});

// Link the /Api/ideas
const ideasRouter = require('./routes/ideas');
// app.use("EndPoint", "Linked Location" )
app.use('/api/ideas', ideasRouter); // this is how we link

// We cant /api/ideas to this files in server.js
const express = require('express');
const router = express.Router() ;  



const ideas = [
    {
      id: 1,
      text: 'Positive NewsLetter, a newsletter that only shares positive, uplifting news',
      tag: 'Technology',
      username: 'TonyStark',
      date: '2022-01-02',
    },
    {
      id: 2,
      text: 'Milk cartons that turn a different color the older that your milk is getting',
      tag: 'Inventions',
      username: 'SteveRogers',
      date: '2022-01-02',
    },
    {
      id: 3,
      text: 'ATM location app which lets you know where the closest ATM is and if it is in service',
      tag: 'Software',
      username: 'BruceBanner',
      date: '2022-01-02',
    },
  ];
  

// http://localhost:5000/api/ideas
// Get all Ideas Route
router.get('/' , (req, res)=> {
    // send an object this is the common way
    res.json({success: true , data:ideas} ) ;
}); 


// get asingle idea using query param (:id)
router.get('/:id' , (req, res)=> {
    // High order Array Methid
    // the id is string therefore we want to convert it  to number
    // because the id in object ideas is a number (int)
    const idea = ideas.find( (idea) => idea.id === +req.params.id) ; 
    //handle error 
    if (!idea) {
        return res
            .status(404)
            .json({success:false , error: 'Resource not Found'}) // not found
    }
    res.json({success: true , data:idea});
}); 

// add an Idea 
router.post('/', (req , res )=> {
  // demo id we canacsses request.body."Keys"
  const idea  = {
    id : ideas.length+1  , 
    text : req.body.text,
    tag: req.body.tag , 
    username: req.body.username,
    date: new Date().toISOString().slice(0,10)
  }
  
ideas.push(idea) ;
  // midlleware allow us to accses request body 
  res.send({success: true , data:idea}) ;z
});


// Update asingle idea using query param (:id)
router.put('/:id' , (req, res)=> {
  // High order Array Methid
  // the id is string therefore we want to convert it  to number
  // because the id in object ideas is a number (int)
  const idea = ideas.find( (idea) => idea.id === +req.params.id) ; 
  //handle error 
  if (!idea) {
      return res
          .status(404)
          .json({success:false , error: 'Resource not Found'}) // not found
  }
  
  // we found the idea , upadate taext and tag
  idea.text = req.body.text || idea.text ; 
  idea.tag = req.body.tag || idea.tag ; 
  
  res.json({success: true , data:idea});
}); 

// Delete asingle idea using query param (:id)
router.delete('/:id' , (req, res)=> {
  // High order Array Methid
  // the id is string therefore we want to convert it  to number
  // because the id in object ideas is a number (int)
  const idea = ideas.find( (idea) => idea.id === +req.params.id) ; 
  //handle error 
  if (!idea) {
      return res
          .status(404)
          .json({success:false , error: 'Resource not Found'}) // not found
  }
  
  // we found the idea , delet we can use splice 
  const index = ideas.indexOf(idea)
  ideas.splice(index,1) ; // we just remove 1 object

  res.json({success: true , result: `deleted`});
}); 

module.exports = router ;



// We can /api/ideas to this files in server.js
const express = require('express');
const router = express.Router();

const Idea = require('../models/Idea');

// http://localhost:5000/api/ideas
// Get all Ideas Route update to async await or await then
router.get('/', async (req, res) => {
  // when we use our model is async
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Something went worng' }); // send an object this is the common way
  }
});

// get asingle idea using query param (:id)
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Resource not Found' }); // not found
  }
});

// add an Idea  we also added async
router.post('/', async (req, res) => {
  // demo id we canacsses request.body."Keys"
  const idea = new Idea({
    // id : ideas.length+1  ,
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
    // date: new Date().toISOString().slice(0,10)
  });

  try {
    // in this case we want to know if we saved idea  so we can rturned to the user -  we dont have to
    const savedidea = await idea.save(); // will save the new idae to the data base
    res.send({ success: true, data: savedidea });
  } catch (error) {
    console.log('new idea saved to database  = ', savedidea);
    res.status(500).json({ success: false, error: 'Something went worng' }); // send an object this is the common way
  }
  // midlleware allow us to accses request body
});

// Update asingle idea using query param (:id)
// new:true means if no idea with such an id it will uppdate
// with an new one
router.put('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    // match the user name with the idea.userNmae
    if (idea.username === req.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        { new: true }
      );
      return res.json({ success: true, data: updatedIdea });
    } else {
      // Usernames  do not match  .. 403 Not authrized
      res
        .status(403)
        .json({ success: false, error: 'you are not authrized to update !' }); // not found
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Resource not Found' }); // not found
  }
});

// Delete asingle idea using query param (:id)
router.delete('/:id', async (req, res) => {
  try {
    // we want to validate before we delete ,
    // this is not real world validation!
    const idea = await Idea.findById(req.params.id);
    // match the user name with the idea.userNmae
    console.log('usenam', idea.username);
    console.log('req', req.body.username);
    if (idea.username === req.body.username) {
      // console.log('req', req);
      await Idea.findByIdAndDelete(req.params.id);
      return res.json({ success: true, data: 'delete successful' });
    }

    // Usernames  do not match  .. 403 Not authrized
    res
      .status(403)
      .json({ success: false, error: 'you are not authrized to delete !' }); // not found
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Resource not Found' }); // not found
  }
});

module.exports = router;

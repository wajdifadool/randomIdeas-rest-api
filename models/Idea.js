const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
  text: {
    type: String,
    // some backend validaition
    required: [true, 'please add a text filed '],
  },
  tag: {
    type: String,
  },
  username: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
//  we need to export the Schema that we created
module.exports = mongoose.model('Idea', IdeaSchema);

const mongoose = require('mongoose');
const Reaction = require('./Reaction.js');
const timestamps = require('mongoose-timestamp');

const thoughtSchema = new mongoose.Schema({
    thoughtText: { 
        thought: { type: String, required: true, minLength: 1, maxLength: 280}, 
    },
    // createdAt: { type: Date, default: Date.now }, 
    createdAt:{
        date: { type: Date, default: Date.now }, 
    }, 
    username: {
      type: String,
      required: true,  
    },
    reactions: 
         { type: mongoose.Schema.Types.ObjectId, ref: Reaction, default: null },
});

thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return `reactions: ${this.reactions.length}`;
  });

const Thought = mongoose.model('Thought', thoughtSchema);

const handleError = (err) => console.error(err);

Thought.create(
    {
        thoughtText: { thought: 'test' },
        username: 'jyaws',
    },
    (err, data) => {
    if (err) {
        console.error(err);
    }
    console.log(data);
    }
);

module.exports = Thought;
const mongoose = require('mongoose');
// const Reaction = require('./Reaction.js');
const timestamps = require('mongoose-timestamp');
const User = require('./User');

let validateUsername = async function(username) {
    let res = await User.findOne({username: username})
    return (!res
    ? false
    : true
    )
}


const thoughtSchema = mongoose.Schema({
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280},
    // createdAt: { type: Date, default: Date.now }, 
    createdAt:{
        date: { 
            type: Date, 
            default: Date.now 
        }, 
    }, 
    username: {
      type: String,
      required: true, 
      validate: [validateUsername, 'No user with that username'] 
    },
    // reactions: 
    //      [{ type: mongoose.Schema.Types.ObjectId, 
    //         ref: Reaction, 
    //         default: null }],
});

const Thought = mongoose.model('Thought', thoughtSchema);

thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return `reactions: ${this.reactions.length}`;
  });



const handleError = (err) => console.error(err);

module.exports = Thought;
const mongoose = require('mongoose');
// const Reaction = require('./Reaction.js');
// const timestamps = require('mongoose-timestamp');
const User = require('./User');

// A function that checks to see if the username of the thought is a valid entry in the database.
let validateUsername = async function(username) {
    let res = await User.findOne({username: username})
    return (!res
    ? false
    : true
    )
}

// Creates a subdocument schema that holds reaction data for thoughts.
const reactionSchema = new mongoose.Schema({
  createdAt: {
    date: {
    type: Date,
    default: Date.now,
    get: formatDate
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280
  },
  username: {
    type: String,
    required: true
  },
}
})
// Creates a document that holds all of the necessary parameters for a thought. username runs a validator to make sure that the thought has a valid user attached with it.
// reactions holds an array of reactions to a thought (from the subdocument above)
const thoughtSchema = mongoose.Schema({
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280},
    createdAt:{
        date: { 
            type: Date,
            default: Date.now, 
            get: formatDate 
        },
    }, 
    username: {
      type: String,
      required: true, 
      validate: [validateUsername, 'No user with that username'] 
    },
    reactions: [reactionSchema] 
},
{
  timestamps: true,
  toJSON: { getters: true, virtuals: true },
});


// Creates the Thought model
const Thought = mongoose.model('Thought', thoughtSchema);

// Creates a virtual parameter that shows the amount of reactions based on the amount of reaction entries in the reactions array.
reactionSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// This is a function that formats the create dates of the thoughts and reactions into an easier to read form.
function formatDate(date) {
  let d = new Date(date),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();

if (month.length < 2) month = '0' + month;
if (day.length < 2) day = '0' + day;
console.log(d)
return d.toLocaleDateString() + ' at ' +  d.toLocaleTimeString();
}

// Exports Thought as a module.
module.exports = Thought;
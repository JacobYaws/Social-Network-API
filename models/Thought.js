const mongoose = require('mongoose');
// const Reaction = require('./Reaction.js');
// const timestamps = require('mongoose-timestamp');
const User = require('./User');

let validateUsername = async function(username) {
    let res = await User.findOne({username: username})
    return (!res
    ? false
    : true
    )
}

// let date = () => { new Date();
// console.log(date.toDateString());
// };

const reactionSchema = new mongoose.Schema({
  // reactionId: { 
  //   type: mongoose.Schema.Types.ObjectId,
  //   default: null 
  // },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // get: () => {

    // }
  }
})

const thoughtSchema = mongoose.Schema({
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280},
    createdAt:{
        date: { 
            // type: Date, 
            // default: Date.now 
            type: Date,
            default: Date.now, 
            // get: (date)
            get: formatDate 
            // => {date.toDateString();
            // console.log(date.toDateString)},
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



const Thought = mongoose.model('Thought', thoughtSchema);

reactionSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    // return `reactions: ${this.reactions.length}`;
    return this.reactions.length;
  });



// const handleError = (err) => console.error(err);

function formatDate(date) {
  let d = new Date(date),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();

if (month.length < 2) month = '0' + month;
if (day.length < 2) day = '0' + day;
console.log(d)
// return [year, month, day].join('-');
return d.toLocaleDateString() + ' at ' +  d.toLocaleTimeString();
}

module.exports = Thought;
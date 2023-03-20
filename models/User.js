const mongoose = require('mongoose');
const Thought = require('./Thought.js');

let validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true},
    email: { 
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'An email address is required',
        validate: [validateEmail, 'Please fill in a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    thoughts: { 
        type: mongoose.Schema.Types.ObjectId, 
         ref: 'Thought' 
    },
    friends: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
 },
          
})

const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);

User.create(
    {
        username: 'jyaws',
        email: 'mail@mail.com',
        thoughts: ['I want to go on vacation'],
        friends: ['Austin', 'Ethan', 'Brandon'],
    },
    (err, data) => {
        if (err) {
            console.error(err);
        }
        console.log(data);
        }
);

// TODO: Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    })

module.exports = User;

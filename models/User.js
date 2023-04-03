// Importing modules necessary to making the file run correctly.
const mongoose = require('mongoose');
const Thought = require('./Thought');

// A funciton used to verify that the email that is valid is a valid email format.
let validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
// Creates the user with all the necessary parameters. Email runs a validator to check that the email submitted is the correct format.
// thoughts and friends create a new type (thoughts references Thought) to store an array of values.
const userSchema = mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true
    },
    email: { 
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'An email address is required',
        validate: [validateEmail, 'Please fill in a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    thoughts: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: Thought, 
    }],
    friends: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
 }]
},
 {
    toJSON: {
        virtuals: true,
    },
    id: false,
}         
);



const handleError = (err) => console.error(err);

// TODO: Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
// Creates a virtual parameter that shows the friend count of the user based on the amount of friend entries in the friends array.
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    })

// Creates the User model.
const User = mongoose.model('user', userSchema);

// Exports User as a module
module.exports = User;

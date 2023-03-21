const mongoose = require('mongoose');
const Thought = require('./Thought');


let validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

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
            // user: { 
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
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    })

const User = mongoose.model('user', userSchema);

module.exports = User;

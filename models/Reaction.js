const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: Number, 
        ref: 'ObjectId',
        default: null,
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        date: { type: Date, default: Date.now },
    },
});

const Reaction = mongoose.model('Reaction', reactionSchema);

const handleError = (err) => console.error(err);

// Reaction.create(
//     {
//         objectId: 1,
//         reactionBody: 'test',
//         username: ['jyaws'],
//     },
//     (err) => (err ? handleError(err) : console.log('Created new user'))
// );

module.exports = Reaction
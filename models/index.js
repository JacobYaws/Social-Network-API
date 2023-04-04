// This takes all of the module exports from the other files in the directory and exports them to be used elsewhere in the project.
const Thought = require('./Thought');
const User = require('./User');
// const Reaction = require('./Reaction');

module.exports = { User, Thought }
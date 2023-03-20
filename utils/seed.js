const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');

console.time('seeding');

connection.once('open', async () => {
    await User.deleteMany({});
    await Thought.deleteMany({});
})
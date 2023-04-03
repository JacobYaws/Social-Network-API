const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');

console.time('seeding');

connection.on('error', (err) => err);

const seed = connection.once('open', async () => {
    await User.deleteMany({});
    // await Reaction.deleteMany({});
    await Thought.deleteMany({});
    // let res = createUser();
    


// Creates a user with the required parameters to seed the database to reduce the chance of errors using the application.
await User.create(
    {
        username: 'jyaws',
        email: 'mail@mail.com',
        thoughts: [],
        friends: [],
    },
    (err, data) => {
        if (err) {
            console.error(err);
        }
        console.log(data);
        }
);

// Creates another user with the required parameters to seed the database to reduce the chance of errors using the application.
await User.create(
    {
        username: 'test',
        email: 'test@test.com',
        thoughts: [],
        friends: [],
    },
    (err, data) => {
        if (err) {
            console.error(err);
        }
        console.log(data);
        }
);


// Creates a thought with the required parameters to seed the database. The thought is tied to a user.
await Thought.create(
    {
        thoughtText: 'Thoughts...',
        username: 'jyaws',
    },
    async (err, data) => {
    if (err) {
        console.error(err);
    }
    console.log(data._id);
    const id = data._id;
    idString = id.toString();
    console.log(idString);
    // This value is used to make the thoughtId compatible with the Mongo database.
    objectIdString = ('ObjectId("' + idString + '")');
    const query = {}
    // The new thought will be pushed to the user's thought array and will reference the thought's id.
    await User.updateOne({ username: 'jyaws' }, { $push: { thoughts: data._id }}),
    process.exit(0);
    }

    );
})



   
    

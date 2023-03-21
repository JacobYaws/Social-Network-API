const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');

console.time('seeding');

connection.on('error', (err) => err);

const seed = connection.once('open', async () => {
    await User.deleteMany({});
    // await Reaction.deleteMany({});
    await Thought.deleteMany({});
    // let res = createUser();
    


// function createUser() {
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



await Thought.create(
    {
        thoughtText: 'ooooooooooooooooo weeeeeeeeeeeeeeee',
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
    objectIdString = ('ObjectId("' + idString + '")');
    // console.log(objectIdString);
    const query = {}
    
    await User.updateOne({ username: 'jyaws' }, { $push: { thoughts: data._id }}),
        // { $addToSet: { thoughts: objectIdString }})
        // console.log(User.updateOne({ thoughts: objectIdString })),
            // { $addToSet: { thoughts: objectIdString }}));
    process.exit(0);
    }

    );
})



   
    

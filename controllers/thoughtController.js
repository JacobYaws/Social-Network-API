const { Thought, User } = require('../models');

module.exports = {
  // The function used to get all thoughts in the database.
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Gets a single thought based on the _id passed into the request.
  getSingleThought(req, res) {
    console.log(req.params._id)
    Thought.findOne({ _id: req.params._id })
      .select('-__v')
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(dbThoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Creates a thought and adds it to the user's thoughts array.
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
         User.updateOne({ username: req.body.username }, { $push: { thoughts: thought._id }})
         res.json(thought)
  })
  
      .catch((err) => res.status(500).json(err));
      
},
// Deletes a thought based on the _id passed into the request.
deleteThought(req, res) {
  Thought.findOneAndDelete({ _id: req.params._id })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with this ID' })
        : res.json({ message: 'Thought deleted!' })
    )
    .catch((err) => res.status(500).json(err));
},
// Updates a thought based on the body that is set in the request.
updateThought(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params._id },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with this ID' })
        : res.json(thought)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},
// Adds a reaction to a thought based on the body that is set in the request. If the target thought does not exist, an error will be returned.
addReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body }},
    { new: true } 

  )
.then((dbThoughtData) => {
  console.log(dbThoughtData.params)
  if (!dbThoughtData) {
    res.status(404).json({
      message: "No thoughts with this ID"
    });
  } else {
    res.json(dbThoughtData);
  }
})
},
// Deletes a reaction based on the reactionId passed into the request. If the thought or reaction do not exist, an error will be returned.
  async deleteReaction(req, res) {
    await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId }}},
      { runValidators: true, new: true }
      )
      .then((data) => {
        console.log(data)
        if(!data) {
          res.status(404).json({
            message: "No thought with that reactionid"
          });
          console.log(req.params);
        } else {
        res.json(data);
        }
      })

      }
  };

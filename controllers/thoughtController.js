const { Thought, User } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
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
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
         User.updateOne({ username: req.body.username }, { $push: { thoughts: thought._id }})
         res.json(thought)
  })
  
      .catch((err) => res.status(500).json(err));
      
},
deleteThought(req, res) {
  Thought.findOneAndDelete({ _id: req.params._id })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with this ID' })
        : res.json({ message: 'Thought deleted!' })
    )
    .catch((err) => res.status(500).json(err));
},
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
  async deleteReaction(req, res) {
    await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId }}},
      { runValidators: true, new: true }
      )
      // .then((dbThoughtData) => res.json(dbThoughtData))
      // .catch((err) => res.json(err));
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

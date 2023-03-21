const { Thought, User } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single comment
  getSingleThought(req, res) {
    console.log(req.params._id)
    Thought.findOne({ _id: req.params._id })
      .select('-__v')
      // .populate({
      //   path: "thoughts",
      //   select: "-__v",
      //   })
        .select("-__v")
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(dbThoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a comment
  createThought(req, res) {
    Thought.create(req.body)
      // .then((dbThoughtData) => res.json(dbThoughtData))
      .then((thought) => {
        // !thought
        //   ? res.status(404).json({ message: 'No user with that ID' })
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
    // .then(() => res.json({ message: 'User and associated apps deleted!' }))
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
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json(thought)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}
};

// module.exports = {
//   getComments(req, res) {
//     Comment.find()
//       .then((comment) => res.json(comment))
//       .catch((err) => res.status(500).json(err));
//   },
//   // Get a single comment
//   getSingleComment(req, res) {
//     Comment.findOne({ _id: req.params.commentId })
//       .then((comment) =>
//         !comment
//           ? res.status(404).json({ message: 'No comment found with that id' })
//           : res.json(comment)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
//   // Create a comment
//   createComment(req, res) {
//     Comment.create(req.body)
//       .then((comment) => {
//         return Post.findOneAndUpdate(
//           { _id: req.body.postId },
//           { $push: { comments: comment._id } },
//           { new: true }
//         );
//       })
//       .then((post) =>
//         !post
//           ? res
//               .status(404)
//               .json({ message: 'comment created, but no posts with this ID' })
//           : res.json({ message: 'comment created' })
//       )
//       .catch((err) => {
//         console.error(err);
//       });
//   },
// };
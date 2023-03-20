const { Reaction, Thought } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single comment
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No comment found with that id' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a comment
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return Reaction.findOneAndUpdate(
          { _id: req.body.reactionId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((reaction) =>
        !reaction
          ? res
              .status(404)
              .json({ message: 'Reaction created, but no thoughts with this ID' })
          : res.json({ message: 'Reaction created' })
      )
      .catch((err) => {
        console.error(err);
      });
  },
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
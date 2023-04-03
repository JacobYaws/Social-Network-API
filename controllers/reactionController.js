const Reaction = require('../models');

module.exports = {
  // The function used to get reactions of a thought.
  getReactions(req, res) {
    Reaction.find()
      .then((reactions) => res.json(reactions))
      .catch((err) => res.status(500).json(err));
  },
  // The function to get a single reaction based on the reactionId passed into the request.
  getSingleReaction(req, res) {
    Reaction.findOne({ _id: req.params.reactionId })
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: 'No reaction with that ID' })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Creates a new reaction.
  createReaction(req, res) {
    Reaction.create(req.body)
      .then((dbReactionData) => res.json(dbReactionData))
      .catch((err) => res.status(500).json(err));
  },
};

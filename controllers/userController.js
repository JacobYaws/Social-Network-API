const { Thought, User } = require('../models');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    console.log(req.params._id);
    User.findOne({ _id: req.params._id })
        .select("-__v")
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params._id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts }})
      )
      .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  async updateUser(req, res) {
    let oldUser = await User.findOne({ _id: req.params._id })
    User.findOneAndUpdate(
      { _id: req.params._id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then(async (user) => {
        !user
          ? res.status(404).json({ message: 'No user with this id' })
          : res.json(user)
          let test = await Thought.updateMany(
            { username: oldUser.username },
            { username: req.body.username }
          )
          console.log(test.modifiedCount)
  })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  async addFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $set: { friends: req.params.friendId }}, { new: true })
    .then((dbUserData) => res.json(dbUserData))
    User.findOneAndUpdate({ _id: req.params.friendId }, { $set: { friends: req.params.userId }}, { new: true })
      .catch((err) => res.status(500).json(err));
  },
  
  async deleteFriend(req, res) {
    await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId }}, { new: true});
    await User.findOneAndUpdate({ _id: req.params.friendId }, { $pull: { friends: req.params.userId }}, { new: true })
    .then((data) => {
      if(!data) {
        res.status(404).json({
          message: "No user with that id"
        });
        console.log(req.params);
        
    }
    res.json(data);
    })
  },


};
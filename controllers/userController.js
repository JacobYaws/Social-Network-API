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
      .select('-__v')
      // .populate({
      //   path: "thoughts",
      //   select: "-__v",
      //   })
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
    // console.log(oldUser);
    // console.log(oldUser.username);
    User.findOneAndUpdate(
      { _id: req.params._id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then(async (user) => {
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
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
  async updateFriend(req, res) {
    User.updateOne({ username: req.body.username }, { $push: { thoughts: thought._id }})
  }
  

};
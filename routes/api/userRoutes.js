// Imports all of the necessary modules need for the file to run correctly.
const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

//route /api/users

// getUsers and createUser will be served through the /api/users endpoint.
router.route('/').get(getUsers).post(createUser);

// getSingleUser, deleteUser, and updateUser will all be served through the /api/users/:_id endpoint.
router.route('/:_id').get(getSingleUser).delete(deleteUser).put(updateUser);

// Add and delete friend will be served through the /api/users/:userId/friends/:friendId endpoint.
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);


module.exports = router;
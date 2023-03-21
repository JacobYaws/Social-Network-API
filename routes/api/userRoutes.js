const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
} = require('../../controllers/userController');

//route /api/users

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:_id').get(getSingleUser).delete(deleteUser).put(updateUser);


module.exports = router;
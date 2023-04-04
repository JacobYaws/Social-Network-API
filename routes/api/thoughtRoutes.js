const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
// getUsers and createUser will be served through the /api/thoughts endpoint.
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
// getSingleThought, deleteThought, and updateThought will all be served through the /api/thoughts/:_id endpoint.
router.route('/:_id').get(getSingleThought).delete(deleteThought).put(updateThought);

// addReaction will be served through the /api/thoughtId/reactions endpoint.
router.route('/:thoughtId/reactions').post(addReaction);

// deleteThought will be served through the /api/thoughtId/reactions/reactionId endpoint.
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
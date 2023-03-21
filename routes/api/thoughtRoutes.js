const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
} = require('../../controllers/thoughtController');

// /api/comments
router.route('/').get(getThoughts).post(createThought);

// /api/comments/:commentId
router.route('/:_id').get(getSingleThought).delete(deleteThought).put(updateThought);

module.exports = router;
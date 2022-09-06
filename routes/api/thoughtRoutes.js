const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtsById,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  addReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

//GET requests for /api/thoughts
router.route("/").get(getAllThoughts);

//GET, PUT, and DELETE requests for /api/thoughts/:id
router
  .route("/:id")
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

//POST requests for /api/thoughts/:userId
router.route("/:userId").post(createThoughts);

//POST request for /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

//DELETE request for /api/thoughts/:thoughtId/reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;

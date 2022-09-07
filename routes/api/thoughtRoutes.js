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

//GET & POST requests for /api/thoughts
router.route("/").get(getAllThoughts).post(createThoughts);

//GET, PUT, and DELETE requests for /api/thoughts/:id
router
  .route("/:id")
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

//POST & DELETE request for /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction).delete(deleteReaction);

module.exports = router;

const router = require("express").Router();

const { Router } = require("express");
//all requirements from user-controller.js
const {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

//set up for GET and POST routes for /api/users/
router.route("/").get(getAllUsers).post(createUsers);

//set up for GET, PUT and DELETE routes for /api/users/:id
router.route("/:id").get(getUsersById).post(updateUsers).delete(deleteUsers);

//set up for POST and DELETE routes for /api/users/:userid/friends/:friendId
router.route("/:id/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;

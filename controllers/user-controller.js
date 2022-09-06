const { Users, Thoughts } = require("../models");

const userController = {
  //new user
  createUsers({ body }, res) {
    Users.create(body)
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => res.status(400).json(err));
  },

  //get all users
  getAllUsers(req, res) {
    Users.find({})
      .select("-__v")
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //get user using /:id
  getUsersById({ params }, res) {
    Users.findOne({ _id: params.id })
      .populate([
        { path: "thoughts", select: "-__v" },
        { path: "friends", select: "-__v" },
      ])
      .select("-__v")
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res
            .status(400)
            .json({ message: "No user was found with the given ID" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //POST for users
  createUsers({ body }, res) {
    Users.create(body)
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => res.status(400).json(err));
  },

  //PUT request for users by ID
  updateUsers({ params, body }, res) {
    Users.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res
            .status(404)
            .json({ message: "No user was found with the given ID" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //DELETE request for users by ID
  deleteUsers({ params }, res) {
    Users.findOneAndDelete({ _id: params.id })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res
            .status(400)
            .json({ message: "No user was found with the given ID" });
          return;
        }
        //clear user with this id that are in friends array and also existing comments made by user
        Users.updateMany(
          { _id: { $in: dbUsersData.friends } },
          { $pull: { friends: params.id } }
        )
          .then(() => {
            Thoughts.deleteMany({ username: dbUsersData.username })
              .then(() => {
                res, json({ message: "User was successfully deleted" });
              })
              .catch((err) => res.status(400).json(err));
          })
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => res.status(400).json(err));
  },

  //POST request for friends
  addFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res
            .status(404)
            .json({ message: "No user can be found with the given ID" });
          return;
        }
        Users.findOneAndUpdate(
          { _id: params.friendId },
          { $addToSet: { friends: params.userId } },
          { new: true, runValidators: true }
        )
          .then((dbUsersData2) => {
            if (!dbUsersData2) {
              res.status(404).json({
                message: "No user can be found with the given friend ID",
              });
              return;
            }
            res.json(dbUsersData);
          })
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  },

  //DELETE request for friends
  deleteFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({
            message: "User cannot be found with the given friend Id",
          });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;

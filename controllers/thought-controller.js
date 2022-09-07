const { Users, Thoughts } = require("../models");

const thoughtController = {
  //create new thought
  createThoughts({ body }, res) {
    Thoughts.create(body)
      .then((dbThoughtData) => {
        return Users.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: "No thought was found with the given ID" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  //GET request for all thoughts
  getAllThoughts(req, res) {
    Thoughts.find({})
      .populate({ path: "reactions", select: "-__v" })
      .populate({ path: "thoughts", select: "-__v" })
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //GET request for thoughts by ID
  getThoughtsById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      // .populate({ path: "reactions", select: "-__v" })
      // .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "No thought can be found with this ID" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //PUT request to update thoughts
  updateThoughts({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
    })
      // .populate({ path: "reactions", select: "-__v" })
      // .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "No thought was found with the given ID" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  //DELETE request for thoughts
  deleteThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "No thought was found with the given ID" });
          return;
        }
        res.json(dbThoughtData);
        // Users.findOneAndUpdate(
        //   { username: dbThoughtData.username },
        //   { $pull: { thoughts: params.id } }
        // )
        //   .then(() => {
        //     res.json({ message: "Thought was successfully deleted" });
        //   })
        //   .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(400).json(err));
  },

  //POST request to add reaction
  addReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true }
    )
      // .populate({ path: "reactions", select: "-__v" })
      // .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "No thought was found with the given ID" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //DELETE request for reaction
  deleteReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "No thought was found with the given ID" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = thoughtController;

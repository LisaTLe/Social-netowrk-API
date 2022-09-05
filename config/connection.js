const { connect, connection } = require("mongoose");

const connectionMongo =
  process.env.MONGO_URI || "mongodb://localhost/social-network-api";

connect(connectionMongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

module.exports = connection;

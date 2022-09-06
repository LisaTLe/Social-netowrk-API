const express = require("express");
const routes = require("./routes");
const db = require("./config/connection");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(require(routes));

// db.once("open", () => {
//   app.listen(PORT, () => {
//     console.log(`Now listening at http://localhost:${PORT}`);
//   });
// });

mongoose.connect(
  process.env.MONODB_URI || "mongodb://localhost/social-network-API",
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set("debug", true);

app.listen(PORT, () =>
  console.log(`Now listening at http://localhost:${PORT}`)
);

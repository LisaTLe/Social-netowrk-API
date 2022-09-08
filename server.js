const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(require("./routes"));

// db.once("open", () => {
//   app.listen(PORT, () => {
//     console.log(`Now listening at http://localhost:${PORT}`);
//   });
// });

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1/social-network-api",
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

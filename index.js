require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongoString = process.env.DATABASE_URL;
const cors = require("cors");
const port = process.env.PORT || 3000;

mongoose.connect(mongoString);

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database connected");
});
const app = express();
const routes = require("./routes/routes");

// app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// use it before all route definitions
app.use(cors({ origin: "*" }));

app.use("/api", routes);

app.listen(port, "0.0.0.0", function () {
  console.log(`Server Started at ${3000}`);
});

"use strict";
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const path = require("path");

app.use(cors());
// app.use(helmet());
app.use(express.static("./dist"));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./dist/", "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Updating contents .....");
});

app.listen(process.env.PORT);
console.log("Listening on port " + process.env.PORT);

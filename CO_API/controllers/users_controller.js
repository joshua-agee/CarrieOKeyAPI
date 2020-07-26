const express = require("express");
const users = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");

users.get("/", (req, res) => {
  res.send("Login/Sign up");
});

users.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );

  User.create(req.body, (err, createdUser) => {
    console.log("New user is created: ", createdUser);
    res.send(createdUser);
  });
});

module.exports = users;

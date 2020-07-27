const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const User = require("../models/users.js");

sessions.post("/", (req, res) => {
  User.findOne({ email: req.body.logEmail }, (err, foundUser) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!foundUser) {
      res.status(400).json({ error: "Sorry, no user found" });
    } else {
      if (bcrypt.compareSync(req.body.logPassword, foundUser.password)) {
        req.session.currentUser = foundUser;
        res.send(foundUser);
      } else {
        res.status(400).json({ error: "Sorry, password does not match" });
      }
    }
  });
});

module.exports = sessions;

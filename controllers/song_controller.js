const express = require("express");

const song = express.Router();

const Song = require("../models/song.js");

//index
song.get("/", (req, res) => {
  Song.find({}, (error, foundSong) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(foundSong);
  });
});

//create

song.post("/", async (req, res) => {
  Song.create(req.body, (error, createdSong) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }

    res.status(200).send(createdSong);
  });
});

// findOne

song.post("/findOne", async (req, res) => {
  console.log(req.body);
  console.log(req.body.songName);
  Song.findOne({ songName: req.body.songName }, (error, foundSong) => {
    if (error) {
      console.log("error finding song from database");
      res.status(400).json({ error: error.message });
    }
    console.log("got response", foundSong);
    res.status(200).send(foundSong);
  });
});

//update

song.put("/:id", (req, res) => {
  Song.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedSong) => {
      if (error) {
        res.status(400).json({ error: error.message });
      }
      res.status(200).json(updatedSong);
    }
  );
});

//delete

song.delete("/:id", (req, res) => {
  Song.findByIdAndRemove(req.params.id, (error, deletedSong) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(deletedSong);
  });
});

module.exports = song;

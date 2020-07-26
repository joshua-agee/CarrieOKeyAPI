const express = require("./node_modules/express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3003;
const path = require("path");
const session = require("express-session");
require("dotenv").config();

const Song = require('./models/song')
const seedSongs = require('./seedsongs.js')

// connections
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/song";
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

//middleware

app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//cors
const whitelist = ["http://localhost:3000"]; //need to add heruko link once created
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) >= 0) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

//controllers

const usersController = require("./controllers/users_controller");
app.use("/users", usersController);

const sessionsController = require("./controllers/sessions_controller");
app.use("/sessions", sessionsController);

const songController = require("./controllers/song_controller.js");
app.use("/song", songController);

// const favoriteController = require("./controllers/favorite_controller.js");
// app.use("/favorite", favoriteController);

//data seed path
app.get('/seed', (req,res)=>{
  Song.create(seedSongs, (err, createdSongs)=>{
    if(err) {
      res.status(400).json({ error: err.message})
  }

  res.status(200).send(createdSongs)
  })
})

app.listen(PORT, () => {
  console.log("listening at port", PORT);
});

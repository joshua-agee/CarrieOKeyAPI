const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
 
songName: String,                                  //need to add more keywords as project progress
lyrics: String,
artist: String,
videoLink: String,
image: String                               

})


module.exports = mongoose.model('Song', songSchema)



//curl -X POST -H "Content-Type: application/json" -d '{"songName":"test", "lyrics":"asdfghjyttrffvb", "artist":"testartist"}' http://localhost:3003/favorite
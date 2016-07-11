var mongoose = require("mongoose");
var Song = require("./song.js");

var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  genres: [ String ],
  songs: [Song.schema]
});


// //creating the model
var Album = mongoose.model("Album", AlbumSchema);

module.exports = Album;
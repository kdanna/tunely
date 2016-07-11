// SERVER-SIDE JAVASCRIPT
//requiring models
var db = require('./models');
//require express in our app
var express = require('express');
//require body parser
var bodyParser = require('body-parser');

// generate a new express app and call it 'app'
var app = express();

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
/************
 * DATABASE *
 ************/

/* hard-coded data */

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"},
      {method: "GET", path: "/api/albums", description: "Albums available"}
    ]
  });
});

app.get('/api/albums', function album_index(req, res){
  db.Album.find({}, function(err, albums) {
  res.json(albums);
});
});

app.post('/api/albums', function create(req, res){
  var newAlbum = req.body;
  var genres = newAlbum.genres.split(",");
  newAlbum.genres = genres;

  db.Album.create(newAlbum, function (err, album){
    if(err){
      res.send("error is " + err);
    }
    res.json(album);
  });
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});

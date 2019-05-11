require("dotenv").config();
var moment = require("moment");
const axios = require("axios");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
const fs = require("fs");

var spotify = new Spotify(keys.spotify);

function getMovie(movieName) {
  var movie = "mr+nobody";
  if (movieName) {
    movie = movieName;
  }
  axios
    .get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    })
    .catch(function(error) {
      console.log(error);
    });
}
function getConcert(artistName) {
  var artist = "two+door+cinema+club";
  if (artistName) {
    artist = artistName;
  }
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        artist +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      for (let i = 0; i < response.data.length; i++) {
        console.log("\n");
        console.log("Venue: " + response.data[i].venue.name);
        console.log(
          "Location: " +
            response.data[0].venue.city +
            ", " +
            response.data[i].venue.country
        );
        console.log(
          "Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY")
        );
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}

function getSong(songName) {
  var song = "the+sign";
  if (songName) {
    song = songName;
  }
  spotify
    .request(
      "https://api.spotify.com/v1/search?q=" +
        song +
        "&type=track&market=US&limit=5"
    )
    .then(function(response) {
      console.log("Artist: " + response.tracks.items[0].artists[0].name);
      console.log("Title: " + response.tracks.items[0].name);
      let preview = response.tracks.items[0].preview_url;
      if (preview != null) {
        console.log("Link to preview: " + preview);
      } else console.log("Sorry no preview is available.");
      console.log("Album: " + response.tracks.items[0].album.name);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function getFileThing() {
  var fileThing = "";
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) throw err;
    fileThing = data.split(",");
    Main(fileThing[0], fileThing[1]);
  });
}

// ******************************NEED TO HIDE API KEYS ***************************
function Main(category, thing) {
  switch (category) {
    case "concert-this":
      getConcert(thing);
      break;
    case "spotify-this-song":
      getSong(thing);
      break;

    case "movie-this":
      getMovie(thing);
      break;

    case "do-what-it-says":
      getFileThing(thing);
      break;
  }
}
Main(process.argv[2], process.argv.slice(3).join("+"));

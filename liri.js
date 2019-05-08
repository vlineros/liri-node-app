require("dotenv").config();
var moment = require("moment");
const axios = require("axios");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

function getMovie() {
  var movieName = "mr+nobody";
  if (process.argv[3]) {
    movieName = process.argv.slice(3).join("+");
  }
  console.log(movieName);
  axios
    .get(
      "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"
    )
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
function getConcert() {
  var artist = process.argv.slice(3).join("+");
  console.log(artist);
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        artist +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      for (let i = 0; i < response.data.length; i++) {
        console.log("\n");
        console.log(response.data[i].venue.name);
        console.log(
          response.data[0].venue.city + ", " + response.data[i].venue.country
        );
        console.log(moment(response.data[i].datetime).format("MM/DD/YYYY"));
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}

function getSong() {
  var song = "the+sign";
  if (process.argv[3]) {
    song = process.argv.slice(3).join(" ");
  }
  spotify
    .search({ type: "track", query: song, limit: 5 })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.log(err);
    });
}

switch (process.argv[2]) {
  case "concert-this":
    getConcert();
    break;
  case "spotify-this-song":
    getSong();
    break;

  case "movie-this":
    getMovie();
    break;

  case "do-what-it-says":
    break;
}

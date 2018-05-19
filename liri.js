require("dotenv").config();


// all the required APIs and other js files
var fs = require('fs');
var keys = require('./keys.js');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

// User input vars //
var command = process.argv[2];
var value = process.argv.slice(3);


// creating spotify and twitter variables
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//////////////////////////////////////////////////////////
//                     input logic                      //
//////////////////////////////////////////////////////////
run(command, value);

function run(command, value) {
  switch (command) {
    case 'my-tweets':
      getTweets();
      break;

    case "spotify-this-song":
      getSong(value);
      break;

    case "movie-this":
      getMovie(value);
      break;

    default:
      break;
  }
}


//////////////////////////////////////////////////////////
//                       TWITTER                        //
//////////////////////////////////////////////////////////


function getTweets() {
  // creating twitter userid variable 
  var myTwitter = 996482349847203841;

  var params = { follow: myTwitter, count: 20 };
  client.get('statuses/user_timeline/', params, function (error, tweets, response) {
    if (!error) {

      // loops through response object and extracts the tweet text and when the tweets were created
      for (var i = 0; i < tweets.length; i++) {
        tweets[i].text
        console.log("'" + tweets[i].text + "'");
        console.log(tweets[i].created_at);
        console.log('\n');
        console.log('------------------------------------------------------')
        console.log('\n');
      }
    } else {
      throw error;
    }
  });
};


/////////////////////////////////////////////////////////////
//                         SPOTIFY                        //
////////////////////////////////////////////////////////////
function getSong(value) {

  if (!value) {
  
    value = "The+Sign+Ace+of+Base";
  }
  var songArtists = [];

  spotify.search({ type: "track", query: value, limit: 1 }, function (err, data) {
    if (err) {
      console.log(err);
    }

    // loop through response object and extract song name, album and preview //
    for (var i = 0; i < data.tracks.items.length; i++) {
      console.log("Song: " + data.tracks.items[i].name);
      console.log("Album: " + data.tracks.items[i].album.name);
      console.log("Preview: " + data.tracks.items[i].preview_url);

      // loop through the response object and extract the name of the artist(s) then push the artist(s) into an array //
      if (data.tracks.items[i].artists.length > 1) {
        for (var j = 0; j < data.tracks.items[i].artists.length; j++) {
          songArtists.push(data.tracks.items[i].artists[j].name);
        }
        // joins songArtists array into a string if there are multiple artists //
        songArtists = songArtists.join(", ");
        console.log("Artist(s): " + songArtists);
        console.log('\n');
        console.log('------------------------------------------------------')
        console.log('\n');
      } else {
        console.log("Artist: " + data.tracks.items[i].artists[0].name);
        console.log('\n');
        console.log('------------------------------------------------------')
        console.log('\n');
      }
    }
  })
}


/////////////////////////////////////////////////////////////
//                         OMDB                            //
////////////////////////////////////////////////////////////
function getMovie(value) {
  var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function (error, response, body) {
    // if there is no error, console movie info
    if (!error && response.statusCode === 200) {

      // parsing the response into an object //
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log('\n');
      console.log('------------------------------------------------------')
      console.log('\n');
    }
  })
}

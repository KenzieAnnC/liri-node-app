require("dotenv").config();


// all the required APIs and other js files
var fs = require('fs');
var keys = require('./keys.js');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

// User input vars //
var command = process.argv[2];
var value = process.argv[3];


// creating spotify and twitter variables
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);



//////////////////////////////////////////////////////////
//                       TWITTER                        //
//////////////////////////////////////////////////////////

// creating twitter userid variable 
var myTwitter = 996482349847203841;

var params = { follow: myTwitter, count: 20 };
client.get('statuses/user_timeline/', params, function (error, tweets, response) {
  if (!error) {

// loops through response object and extracts the tweet text and when the tweets were created
    for (var i = 0; i < tweets.length; i++) {
      tweets[i].text
      console.log("\n")
      console.log("'" + tweets[i].text + "'");
      console.log(tweets[i].created_at);
    }
  } else {
    throw error;
  }
});


/////////////////////////////////////////////////////////////
//                         SPOTIFY                        //
////////////////////////////////////////////////////////////

var songName = '';
var songArtists = [];

spotify.search({ type: "track", query: 'Althea', limit: 1 }, function (err, data) {
  if (err) {
    console.log(err);
  }

  // loop through response object and extract song name, album and preview //
  for (var i = 0; i < data.tracks.items.length; i++) {
    console.log("Song: " + data.tracks.items[i].name);
    console.log("Album: " + data.tracks.items[i].album.name);
    console.log("Preview: " + data.tracks.items[i].preview_url);
    if (data.tracks.items[i].artists.length > 1) {

// loop through the response object and extract the name of the artist(s) then push the artist(s) into an array //
      for (var j = 0; j < data.tracks.items[i].artists.length; j++) {
        songArtists.push(data.tracks.items[i].artists[j].name);
      }
// joins songArtists array into a string if there is more than one //
      songArtists = songArtists.join(", ");
      console.log("Artist(s): " + songArtists);
    } else {
      console.log("Artist: " + data.tracks.items[i].artists[0].name);
    }
  }
});


/////////////////////////////////////////////////////////////
//                         OMDB                            //
////////////////////////////////////////////////////////////

var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";

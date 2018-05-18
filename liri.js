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
    for (var i = 0; i < tweets.length; i++) {
      tweets[i].text
      console.log("\n")
      console.log(JSON.stringify(tweets[i].text, null, 2));
      console.log(JSON.stringify(tweets[i].created_at, null, 2));
    }
  } else {
    throw error;
  }
});


/////////////////////////////////////////////////////////////
//                         SPOTIFY                        //
////////////////////////////////////////////////////////////

var songName = '';

spotify.search({type: "track", query: 'Althea', limit: 1}, function(err, data) {
  if (err) {
    console.log(err);
  }
  for (var i = 0; i < data.tracks.items.length; i++) {
    console.log("\n" + (i+1));
    console.log("Track: " + data.tracks.items[i].name);
    console.log("Album: " + data.tracks.items[i].album.name);
  }
   
});



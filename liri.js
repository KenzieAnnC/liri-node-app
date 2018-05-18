require("dotenv").config();


// all the required APIs and other js files
var fs = require('fs');
var keys = require('./keys.js');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');


// creating spotify and twitter variables
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// creating twitter userid variable 
var myTwitter = 996482349847203841;


// client.get('statuses/user_timeline', {user_id: myTwitter}, function(error, tweets, response) {
//   if(error) throw error; 
//   console.log(JSON.stringify(tweets, null, 2)); 
// });


var params = { id: myTwitter, count: 20 };
client.get('statuses/user_timeline/', params, function (error, tweets, response) {
  if (!error) {
    for (var i = 0; i < tweets.length; i++) {
      tweets[i].text
      console.log(tweets[i].text);
    }
  }
});






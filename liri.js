var command = process.argv[2];

var fs = require("fs");
var keys = require("./keys.js");

//Twitter Request
 function Tweets(){
    var Twitter = require('twitter');

      var client = new Twitter({
        consumer_key: keys.twits.twitKey,
        consumer_secret: keys.twits.twitSecret,
        access_token_key: keys.twits.accTok,
        access_token_secret: keys.twits.accSec
      });

  var params = {screen_name: 'devOpsDarling26'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {

      var tweetDisplay = [];
      for (var i = 0; i < tweets.length; i++){
        var tweeter = tweets[i].user.screen_name;
        var tweetDate = tweets[i].created_at;
        var tweetText = tweets[i].text;
        tweetDisplay.push({
          tweeter: tweeter,
          tweetDate: tweetDate,
          tweetText: tweetText
          });
      }
          for(var i = 0; i < tweetDisplay.length; i++){
            console.log("=======================");
            console.log(tweetDisplay[i].tweeter);
            console.log(tweetDisplay[i].tweetDate);
            console.log(tweetDisplay[i].tweetText); 
        };
      }  
    });
} 

//Spotify Request ---------------------------------------------------------
function spotify(){
        var Spotify = require('node-spotify-api');

        var songTitle;
        if (process.argv[3] === undefined || process.argv[3]=== " "){
                   songTitle = "Ace of Base The Sign";
               } else {
                       songTitle = process.argv[3] 
                   }
        for(var i = 3; i < process.argv.length; i++){
          var space = " ";
          songTitle = songTitle + space + process.argv[i];
        }
        
        var spotify = new Spotify({
	      id: keys.spotkeys.spotID,
        secret: keys.spotkeys.spotSecret
        });

    spotify.search({ 
      type: 'track', 
      query: songTitle
    }, 
    function(err, data) {
      if (err) {
      return console.log('Error occurred: ' + err);
      }
 
  var object = data.tracks.items[0];
  var artist = " Artist: " + object.album.artists[0].name;
  var title = " Title: " + object.name;
  var album = " Album: " + object.album.name;
  var link = " Listen here: " + object.album.href;

  var song = [artist, title, album, link]; 
  
      for (var i = 0; i < song.length; i++) {
        console.log(song[i]);
      };
    }
  )};

//-------------------------------------------------------------------------
// OMDB Request  This is mostly functional!
function movie(){
        var movieName;
        if (process.argv[3] === undefined || process.argv[3]=== " "){
             movieName = "Mr Nobody";
         } else {
                 movieName = process.argv[3];
             }

	var request = require("request");
	request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If the request is successful
if (!error && response.statusCode === 200) {

	//Pull our data out of the JSON object.
	title = "Title: " + JSON.parse(body).Title;
	year = "Release Year: " + JSON.parse(body).Year;
  rating = "IMDB Rating: " + JSON.parse(body).imdbRating;
  rToms = "Tomatometer: " + JSON.parse(body).Ratings[1].Value;
	lang = "Language: " + JSON.parse(body).Language;
	plot = "Plot: " + JSON.parse(body).Plot;
	actors = "Starring: " + JSON.parse(body).Actors;

var film = [title, year, rating, rToms, lang, plot, actors];;

    for (var i = 0; i < film.length; i++) {
      console.log(film[i]);
      }
 	  };
 	});
}

//the do-what-it-says command.
function doWhat(){
    fs.readFile("random.txt", "utf8", function(error, data) {
      if (error) {
        return console.log(error);
      }
      var dataArr = data.split(",");
      
      command = dataArr[0];
      process.argv[3] = dataArr[1];
      
      spotify(dataArr[1]);
    }
  )}; 

switch (command) {
  case 'do-what-it-says':
    doWhat();
    break;
  case 'movie-this':
    movie();
    break
  case 'spotify-this-song':
    spotify();
  break;
  case 'my-tweets':
    Tweets();
  break;
  default:
    console.log("That's not enough! Add one of these commands: 'my-tweets', 'spotify-this-song', 'movie-this', or 'do-what-it-says.'"); 
    break;
}
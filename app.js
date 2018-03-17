var keys = require("./key.js");
var Twitter = require("twitter");
 var Spotify = require('node-spotify-api');


var arg1 = process.argv[2];
var arg2 = process.argv[3];

// console.log( keys.twitter.consumer_key);
// console.log( keys.twitter.consumer_secret);
// console.log( keys.twitter.access_token_key);
// console.log( keys.twitter.access_token_secret);



//creating a function to get the tweets from the profile "Mehathab4eva"

function myTweets() {

		var client = new Twitter({
			consumer_key: keys.twitter.consumer_key,
	  		consumer_secret: keys.twitter.consumer_secret,
	  		access_token_key: keys.twitter.access_token_key,
	  		access_token_secret: keys.twitter.access_token_secret
			});

		var params = {screen_name: 'Mehathab4eva'};
    
    	client.get('statuses/user_timeline', params, function(error, tweets, response){
    		
    		if (!error) {

      					var tweetDisplay = []; //an array to hold ALL the tweets
      					
      						for (var i = 0; i < tweets.length; i++){
							        
							        var tweeter = tweets[i].user.screen_name;
							        var tweetDate = tweets[i].created_at;
							        var tweetText = tweets[i].text;
								      
								        tweetDisplay.push({
								          tweeter: tweeter,
								          tweetDate: tweetDate,
								          tweetText: tweetText
								          });
     																 };
         
				         	for(var i = 0; i < 9; i++){			//Displaying a maximum of 10 tweets
				            console.log("=======================");
				            console.log(tweetDisplay[i].tweeter);
				            console.log(tweetDisplay[i].tweetDate);
				            console.log(tweetDisplay[i].tweetText); 
        											};
												
				      }
				      else {console.log(error);
				      		console.log("Working on the auth...will take some time")}  
    																					});
					}; 
	

function spotify(){
       
        var songTitle;
        if (arg2 === undefined || arg2=== " "){
                   songTitle = "Ace of Base The Sign";
               } else {
                       songTitle = arg2; 
                   }
        for(var i = 3; i < process.argv.length; i++){
          var space = " ";
          songTitle = songTitle + space + process.argv[i];
        }
        
        var spotify = new Spotify({
	      id: keys.spotifyKeys.spotID,
        secret: keys.spotifyKeys.spotSecret
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



function movie(){
        var movieName;
        if (arg2 === undefined || arg2=== " "){
             movieName = "Mr Nobody";
         } else {
                 movieName = arg2;
             }

	var request = require("request");
	request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=b3ed4a06", function(error, response, body) {

  // If the request is successful
if (!error && response.statusCode === 200) {

	//Pull our data out of the JSON object.
	title = "Title: " + JSON.parse(body).Title;
	year = "Release Year: " + JSON.parse(body).Year;
  rating = "IMDB Rating: " + JSON.parse(body).imdbRating;
  rToms = "Tomatometer: " + JSON.parse(body).Ratings[0].Value;
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
      
      arg1 = dataArr[0];
      arg2 = dataArr[1];
     
      
      spotify(arg2);
    }
  )}; 

switch (arg1) {
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


// switch(arg1) {
// 	case 'my-tweets':
// 			myTweets();

// 			break;
// 	default:
//     		console.log("That's not enough! Add one of these commands: 'my-tweets', 'spotify-this-song', 'movie-this', or 'do-what-it-says.'"); 
//     break;
//     		}

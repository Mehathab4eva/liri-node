var keys = require("./key.js");
var Twitter = require("twitter");


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
	




switch(arg1) {
	case 'my-tweets':
			myTweets();

			break;
	default:
    		console.log("That's not enough! Add one of these commands: 'my-tweets', 'spotify-this-song', 'movie-this', or 'do-what-it-says.'"); 
    break;
    		}

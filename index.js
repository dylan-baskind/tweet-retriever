var express = require('express')
var app = express()
var PORT = process.env.PORT
var Twitter = require('twitter')

// Get those tweets!
app.get('/tweets', function (req, res) {
	console.log("end point hit")
	var client = new Twitter({
	  consumer_key: process.env.TWITTER_CONSUMER_KEY,
	  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
	});

	client.get("statuses/user_timeline", function(err, tweets, response){
		if(err)
			return res.status(400).send("Error retrieving tweets")
		
		var tweets = extractTweets( tweets )
		console.log('sent res')
		res.header("Access-Control-Allow-Origin", "*")
		res.header("Access-Control-Allow-Headers", "X-Requested-With")
		res.send( tweets )
	})

	function extractTweets (tweets){
		var data = []
		for(i=0; i < tweets.length; i++){
			var tweet = tweets[i];
			data.push({
				date: tweet.created_at,
				tweet: tweet.text
			})
		}
		return data
	}

})

// Server to listen
var server = app.listen(PORT, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Tweet Retriever - Listening on port: " + PORT)
})
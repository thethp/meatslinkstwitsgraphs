var config = require('./config.json');
var twAPI = require('node-twitter-api');

var tweettweet = function(link) {
    var tw = new twAPI({
	consumerKey: config.twitterApiKey,
	consumerSecret: config.twitterSecret,
	callback: config.twitterCallback
    });
    tw.statuses("update", {
	    status: link
        },
	config.twitterAccessToken,
	config.twitterAccessSecret,
	function(error, data, response) {
	    if(error) {
		console.log('ERROR: ' + error);
	    } else {
		console.log('Tweeted Successfully: ' + data);
	    }
	}
    );
}

module.exports = tweettweet;
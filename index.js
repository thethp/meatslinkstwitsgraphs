//Learning happened via Contra's wearefractal/meatbot && Sam's omni5cience/meatspackles
var config = require('./config.json');
var io = require('socket.io-client');
var twitter = require('./tweettweet');

var Meatsorber = function() {
    if(config.apiKey === undefined) {
	throw new Error('Missing API Key in config.json');
    }
    this.address = config.address || 'https://chat.meatspac.es';
    this.apiKey = config.apiKey;

    twitter('TEST');
    this.socket = io.connect(this.address);
    this.socket.on('message', function cb(data) {
	var msg = data.chat.value;
	console.log(msg);
    }.bind(this));
}();
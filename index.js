//Learning happened via Contra's wearefractal/meatbot && Sam's omni5cience/meatspackles
var config = require('./config.json');
var io = require('socket.io-client');
var twitter = require('./tweettweet');

Meatsorber = function() {
    if(config.apiKey === undefined) {
	throw new Error('Missing API Key in config.json');
    }
    this.address = config.address || 'https://chat.meatspac.es';
    this.apiKey = config.apiKey;
    
    this.socket = io.connect(this.address);
    this.socket.on('connect_error', function cb(data) {
	console.log(data,data.error);
    });
    this.socket.on('message', function cb(data) {
	var msg = data.chat.value;
	lookForLink(msg.message);
    }.bind(this));

    function lookForLink(msg) {
	var regex = /^(https?:\/\/)?((?:\.?[-\w]){1,256})(\.\w{1,10})(?::[0-9]{1,5})?(?:\.?\/(?:[^\s.,?:;!]|[.,?:;!](?!\s|$)){0,2048})?/
	var msg_segments = msg.split(" ");
	msg_segments.forEach(function cb(el,i) {
	    if(el.match(regex)) {
		twitter(el.match(regex)[0]);
	    }
	});
    }
}();

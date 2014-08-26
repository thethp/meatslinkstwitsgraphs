//Learning happened via Contra's wearefractal/meatbot && Sam's omni5cience/meatspackles
var config = require('./config.json');
var io = require('socket.io-client');
var twitter = require('./tweettweet');

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

    var seen={};
    function lookForLink(msg) {
    var regex = /\b(https?:\/\/)?((?:\.?[-\w]){1,256})(\.\w{1,10})(?::[0-9]{1,5})?(?:\.?\/(?:[^\s.,?:;!]|[.,?:;!])\S{0,2048})?\b/g;
    while(link=regex.exec(msg)) {
      link=link[0];
      if(link.match(/maps/) || link.match(/hangouts/)) continue;
      if(link.match(/meatspac\.es\/?$/)) continue;
      if(seen[link]) continue;
      twitter(link);
      seen[link]=1;
    }
  }

}();



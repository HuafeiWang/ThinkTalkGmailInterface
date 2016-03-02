const Tp = require('thingpedia');

module.exports = new Tp.ChannelClass({
    Name: 'TwitterSinkChannel',

    _init: function(engine, device) {
        this.parent();

        this._twitter = device.queryInterface('twitter');
    },

    sendEvent: function(event) {
        console.log('Posting Twitter event', event);

        var status = event[0];
        this._twitter.postTweet({ status: status }, function(err) {
            console.log('Tweeting failed: ' + err);
        }, function() { });
    },
});
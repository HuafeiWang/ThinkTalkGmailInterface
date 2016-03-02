const Tp = require('thingpedia');

module.exports = new Tp.ChannelClass({
    Name: 'GmailPollingTrigger',
    Extends: Tp.PollingTrigger
    RequiredCapabilities: ['channel-state']

    _init: function(engine, state, device) {
        this.parent();
        this.interval = 3600000;
        this.state = state;
        this.url = 'https://www.googleapis.com/gmail/v1/users/'+this.state.userID+'/messages?maxResults=1';
        this.auth = 'Bearer ' + device.accessToken;
        // this.maxResults = 1;
    },

    _onResponse: function(data) {
        // do something
        var thread_IDs = new Array();
        var package = JSON.parse(JSON.stringify(data));
        var msgs = package.messages;
        var newest_msg = msgs[0];
        var threadId = newest_msg.threadId;
        // for (var i=0; i<msgs.length; i++){
        //     var msg = package.messages[i];
        //     // thread_IDs.push(msg.threadId);
        // }
    },
});



// const Tp = require('thingpedia');

// module.exports = new Tp.ChannelClass({
//     Name: 'TwitterSinkChannel',

//     _init: function(engine, device) {
//         this.parent();

//         this._twitter = device.queryInterface('twitter');
//     },

//     sendEvent: function(event) {
//         console.log('Posting Twitter event', event);

//         var status = event[0];
//         this._twitter.postTweet({ status: status }, function(err) {
//             console.log('Tweeting failed: ' + err);
//         }, function() { });
//     },
// });


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
    },

    _onResponse: function(data) {
        // do something
        var thread_IDs = new Array();
        var package = JSON.parse(JSON.stringify(data));
        var msgs = package.messages;
        var newest_msg = msgs[0];
        var threadId = newest_msg.threadId;

        if (state.get(threadId) == null) {
            state.set(threadId, "1");

            var auth = 'Bearer ' + device.accessToken;
            Tp.Helpers.Http.get('https://www.googleapis.com/gmail/v1/users/' + this.device.userId + '/messages/' + threadId, {auth: auth, accept: 'application/json'})
                .then(function(response) {
                    var parsed = JSON.parse(response);
                    console.log('parsed', parsed);
                    // TODO: Extract JSON information and emit to the user
                    var from = ;
                    var content = ;
                    var messageID = ;
                    emitEvent([from, content, messageID]);
            });

        }
    },
});
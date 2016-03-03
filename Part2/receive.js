const Tp = require('thingpedia');

module.exports = new Tp.ChannelClass({
    Name: 'GmailPollingTrigger',
    Extends: Tp.PollingTrigger
    RequiredCapabilities: ['channel-state']

    _init: function(engine, state, device) {
        this.parent();
        this.interval = 3600000;
        this.state = state;
        this.device = device;
        this.url = 'https://www.googleapis.com/gmail/v1/users/'+this.device.userID+'/messages?maxResults=1';
        this.auth = 'Bearer ' + device.accessToken;
    },

    _onResponse: function(data) {
        // do something
        // var thread_IDs = new Array();
        var package = JSON.parse(/*JSON.stringify*/(data));
        var msgs = package.messages;
        var newest_msg = msgs[0];
        var threadId = newest_msg.threadId;
        

        if (this.state.get(threadId) === null){
            this.state.set(threadId, "1");

            var getUrl = 'https://www.googleapis.com/gmail/v1/users/'+this.device.userID+'/messages/'+threadId;
            Tp.Helpers.Http.get(getUrl, {auth: this.auth, accept: 'application/json'})
                .then(function(response) {
                    var parsed = JSON.parse(response);
                    console.log('parsed', parsed);
                    var headers = parsed.payload.headers;
                    var sender, subject;
                    for (var i=0; i<headers.length; i++){
                        var header = headers[i];
                        if (header.name === 'From'){
                            sender = header.value;
                        }else if(header.name === 'Subject'){
                            subject = header.value;
                        }
                    }

                    eventEmit([sender, subject, threadId]);


                    
                });
            }


        
    },
});




const Tp = require('thingpedia');

module.exports = new Tp.ChannelClass({
    Name: 'GmailTrashChannel',

    _init: function(engine, device) {
        this.parent();
        this.device = device;

        // this.url = 'https://www.googleapis.com/gmail/v1/users/'+this.state.userID+'/messages?maxResults=1';
        // this.auth = 'Bearer ' + device.accessToken;
    },

    sendEvent: function(event) {
        var messageID = event[0];
        console.log('Trashing MessageID: ' + messageID);
        var auth = 'Bearer ' + this.device.accessToken;
        Tp.Helpers.Http.post('https://www.googleapis.com/gmail/v1/me/userId/messages/' + messageID + '/trash', {auth: auth, accept: 'application/json'});
    }
});
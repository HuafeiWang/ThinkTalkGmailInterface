var gapi = require('gapi');

const Tp = require('thingpedia');

module.exports = new Tp.ChannelClass({
    Name: 'GmailSinkChannel',
    // Name: 'TwitterSinkChannel',

    _init: function(engine, device) {
        this.parent();

        this._gmail = device.queryInterface('gmail');
    },

    receiveEvent: function listMessages(userId, /*query,*/ callback) {
      var getPageOfMessages = function(request, result) {
        request.execute(function(resp) {
          result = result.concat(resp.messages);
          var nextPageToken = resp.nextPageToken;
          if (nextPageToken) {
            request = gapi.client.gmail.users.messages.list({
              'userId': userId,
              'maxResults': 1,
              // 'pageToken': nextPageToken,
              // 'q': query
            });
            getPageOfMessages(request, result);
          } else {
            callback(result);
          }
        });
      };
      var initialRequest = gapi.client.gmail.users.messages.list({
        'userId': userId,
        'q': query
      });
      getPageOfMessages(initialRequest, []);
    },
});




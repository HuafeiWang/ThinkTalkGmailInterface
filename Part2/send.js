var gapi = require('gapi');

const Tp = require('thingpedia');

module.exports = new Tp.ChannelClass({
	Name: 'GmailSendChannel',

	_init: function(engine, device) {
		this.parent();

		this._gmail = device.queryInterface('gmail');
	},

	sendEvent: function sendMessage(userId, email, callback) {

		console.log('Sending Gmail', email);

	  var base64EncodedEmail = btoa(email);
	  var request = gapi.client.gmail.users.messages.send({
	    'userId': userId,
	    'message': {
	      'raw': base64EncodedEmail
	    }
	  });
	  request.execute(callback);
	},


	// function(event) {
	// 	console.log('Sending Gmail', event);

	// 	var status = event[0];
	// 	this._gmail.sendGmail({ status: status }, function(err) {
	// 		console.log('Gmail sent failed: ' + err);
	// 	}, function() { });
	// },

	
	
});
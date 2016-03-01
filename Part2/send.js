const Tp = require('thingpedia');

module.exports = new Tp.ChannelClass({
	Name: 'GmailSendChannel',

	_init: function(engine, device) {
		this.parent();

		this._gmail = device.queryInterface('gmail');
	},

	sendEvent: function(event) {
		console.log('Sending Gmail', event);

		var status = event[0];
		this._gmail.sendGmail({ status: status }, function(err) {
			console.log('Gmail sent failed: ' + err);
		}, function() { });
	},
	
});
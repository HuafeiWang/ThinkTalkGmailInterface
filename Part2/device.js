const Tp = require('thingpedia');

// // need to be addaped for gmail
// const CONSUMER_KEY = process.env['TWITTER_CONSUMER_KEY'] || 'VZRViA2T4qy7CBZjU5juPumZN';
// // Twitter uses OAuth 1.0, so this needs to be here...
// const CONSUMER_SECRET = process.env['TWITTER_CONSUMER_SECRET'] || rot13('hsTCqM6neIt3hqum6zvnDCIqQkUuyWtSjKBoqZFONvzVXfb7OJ');


function makeGmailApi(engine, accessToken, accessTokenSecret) {
    var origin = platform.getOrigin();
    return new Gmail({
        // consumerKey: CONSUMER_KEY,
        // consumerSecret: CONSUMER_SECRET,
        // callBackUrl: origin + '/devices/oauth2/callback/twitter-account', //need to be adapted
        accessToken: accessToken,
        // accessTokenSecret: accessTokenSecret
    });
}


module.exports = new Tp.DeviceClass({
	Name: 'Gmail Device',
	Kinds: [], 
	UseOAuth2: Tp.Helpers.OAuth2({
		kind: ,
		client_id: '850628573465-u751nimm9tl770eqhor98u00f9oqd6bk.apps.googleusercontent.com',
		client_secret: 'QTRLr_KmawTuPbHRrGDeWOJd',
		scope: ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send'],
		authorize: 'https://accounts.google.com/o/oauth2/auth',
		get_access_token: 'https://accounts.google.com/o/oauth2/token',
		callback: function(engine, accessToken, refreshToken) {
			var auth = 'Bearer ' + accessToken;
			return Tp.Helpers.Http.get('', {auth: auth, accept: ''})
			.then(function(response) {
				var parsed = JSON.parse(response);
				console.log('parsed', parsed);
				return engine.devices.loadOneDevice({ kind: ,
													  accessToken: accessToken,
													  refreshToken: refreshToken,
													  userId: parsed.data.xid,
													  userName: parsed.data.first + ' ' + parsed.data.last }, true);
			});
		}
	}),

	_init: function(engine, state) {
		this.parent(engine, state);

		this.uniqueId = '' + this.userId;

		this.name = "Gmail %s".format(this.userId);
		this.description = "This is a Gmail owned by %s".format(this.userName);
		console.log('this: ', this);
		console.log('this.state: ', this.state);
		console.log('this.device: ', this.device);
	},

	// get auth() {// not sure if accessToken sits in device or state, or this??
 //            return this.device.accessToken;
 //        },

	get userId() {
		return this.state.userId;
	},

	get userName() {
		return this.state.userName;
	},

	get accessToken() {
		return this.state.accessToken;
	},

	get refreshToken() {
		return this.state.refreshToken;
	},

	checkAvailable: function() {
		return Tp.Availability.AVAILABLE;
	},

	queryInterface: function(iface) {
		switch (iface) {
			case 'gmail':
            	return makeGmailApi(this.engine, this.state.accessToken);
			case 'oauth2':
				return this;
			default:
				return null;
		}
	},

	refreshCredentials: function() {

	},
});
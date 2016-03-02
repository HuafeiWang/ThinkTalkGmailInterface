const Tp = require('thingpedia');

function rot13(x) {
    return Array.prototype.map.call(x, function(ch) {
        var code = ch.charCodeAt(0);
        if (code >= 0x41 && code <= 0x5a)
            code = (((code - 0x41) + 13) % 26) + 0x41;
        else if (code >= 0x61 && code <= 0x7a)
            code = (((code - 0x61) + 13) % 26) + 0x61;

        return String.fromCharCode(code);
    }).join('');
}

module.exports = new Tp.DeviceClass({
	Name: 'GmailDevice',
	Kinds: [], 
	UseOAuth2: Tp.Helpers.OAuth2({
		kind: 'edu.stanford.huafei_y0222.gmail',
		client_id: '850628573465-u751nimm9tl770eqhor98u00f9oqd6bk.apps.googleusercontent.com',
		client_secret: rot13('QTRLr_KmawTuPbHRrGDeWOJd'),
		scope: ['https://mail.google.com/', 'https://'],
		authorize: 'https://accounts.google.com/o/oauth2/auth',
		get_access_token: 'https://www.googleapis.com/oauth2/v3/token',
		callback: function(engine, accessToken, refreshToken) {
			var auth = 'Bearer ' + accessToken;
			return Tp.Helpers.Http.get('www.googleapis.com/oauth2/v2/userinfo', {auth: auth, accept: 'application/json'})
			.then(function(response) {
				var parsed = JSON.parse(response);
				console.log('parsed', parsed);
				return engine.devices.loadOneDevice({ kind: 'edu.stanford.huafei_y0222.gmail',
													  accessToken: accessToken,
													  refreshToken: refreshToken,
													  userId: parsed.id,
													  userName: parsed.name }, true);
			});
		}
	}),

	_init: function(engine, state) {
		this.parent(engine, state);

		this.globalName = "Gmail";
		this.uniqueId = "edu.stanford.huafei_y0222.gmail-" + this.userId;
		this.name = "Gmail %s".format(this.userId);
		this.description = "This is a Gmail owned by %s".format(this.userId);
	},

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
		reutrn Tp.Availability.AVAILABLE;
	},

	queryInterface: function(iface) {
		switch (iface) {
			case 'oauth2':
				return this;
			default:
				return null;
		}
	},

	refreshCredentials: function() {

	},
});
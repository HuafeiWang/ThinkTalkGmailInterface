TwitterReplyNotification() {
	@twitter.source(text, _, _, from, "FrankWang2013", _) => 
	@$notify("You are replied by " + from + ": " + text);
}
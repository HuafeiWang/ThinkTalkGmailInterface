Gmail() {
	var messageID : String;
	@Gmail.receive(from, content, _) => @sabrina.say("You have a new mail from " + from + ": " + content);
	@Gmail.receive(_, _, messageid) => messageID(messageid);
	@sabrina.listen(expression), $regex(expression, "^trash$") => @Gmail.trash(messageID);
}
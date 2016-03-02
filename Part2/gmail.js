Gmail() {
	@Gmail.receive(from, content, subject) => @sabrina.say("You have a new mail from " + from + ": " + content);
	@sabrina.listen(expression), $regex(expression, "^sendGmail: ([A-Za-z0-9]+)$", content) => @Gmail.send("cs243test@gmail.com", content, "sent by Sabrina");
}
RandomDice() {
	var dice : Number;
	@sabrina.listen(expression), $regex(expression, "random dice", "i") 
	=> @sabrina.say("Generating a random dice... \n Here is the random dice: " + $toString($ceil($random() * 6)));
}
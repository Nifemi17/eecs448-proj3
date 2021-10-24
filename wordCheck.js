/*
* This file will handle whatever we want it to baby, yeah!
*/

//variable canvas = gameCanvas HTML element
//variable context = gameCanvas's context

function wordCheckTest() {

	$.get("https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt", function(contents){
	//contents variable now contains the contents of the textfile as string
	wordArray = contents;
	console.log("wordArray filled");

	var word = '\porphyraceae\r';

	//check if file contains the word Hello
	var hasString = wordArray.includes(word);
	console.log("finished checking word");

	//outputs true if contained, else false
	if (hasString) {
		context.fillText(word + 'is a word', 100, 100);
	}
   
	else {
		context.fillText(word + 'is not a word', 100, 100);
	}	
	});
}
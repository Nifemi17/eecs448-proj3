/*
* This file handles comparing given strings with the word of lists
*/

//variable context = gameCanvas's context

/*
* returns true if the passed string str is a word on the word list.
*/
function isWord(str) {
	return wordArray.includes(str);
}

/*
* creates a string and then calls isWord to check if it's in the word list. prints the result.
*/
function wordCheckTest() {

	$.get("https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt", function(contents){
	//contents variable now contains the contents of the textfile as string
	wordArray = contents;
	console.log("wordArray filled");

	//word to be checked
	var str = '\nporphyraceae\r';

	//check if file contains the word Hello
	var hasString = isWord(str);
	console.log("finished checking word");

	//prints to canvas if str is a word or not
	if (hasString) {
		context.fillText(str + 'is a word', 100, 100);
	}
   
	else {
		context.fillText(str + 'is not a word', 100, 100);
	}	
	});
}
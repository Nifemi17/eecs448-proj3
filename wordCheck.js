/**
* This file handles comparing given strings with the word of lists
*/

//variable context = gameCanvas's context

/**
* returns true if the passed string str is a word on the word list (wordArr).
* @param str the word string to be chekced
*/
function isWord(str) {
	return wordArray.includes('\n' + str + '\r');
}

/**
* gets word_alpha.txt contents as an arrayBuffer, then copies to wordArray to use in wordCheckTest function.
* wordCheckTest is called once the wordArray is finished being filled.
*/
async function wordPrep() {
	let p = new Promise(function(resolve) {
		$.get('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt', function(contents){
			//contents variable now contains the contents of the textfile as string
			wordArray = contents;
			console.log('wordArray filled');
			resolve();
		});
	});
	await p;
}
/**
* This file handles comparing given strings with the word of lists
*/

//variable context = gameCanvas's context

/**
* returns true if the passed string str is a word on the word list.
*/
function isWord(str) {
	return wordArray.includes(str);
}

/**
* @pre str's value starts with \n and ends with \r
* creates a string and then calls isWord to check if it's in the word list. prints the result.
* Just tests that str is successfully checked as a word or not.
*/
function wordCheckTest() {
	//word to be checked. it MUST start with \n and end with \r in order to work
	var str = '\nzwitterion\r';

	//check if file contains the word Hello
	var hasString = isWord(str);
	console.log('finished checking word');

	//prints to canvas if str is a word or not
	if (hasString || str == '\na\r' || str == '\nzwitterionic\r') {
		context.fillText(str + 'is a word', 100, 150);
	}
	else {
		context.fillText(str + 'is not a word', 100, 150);
	}	
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
	
	//calls this function purely to test my word database, will remove once I know it works - Yuri
	p.then(wordCheckTest());
}
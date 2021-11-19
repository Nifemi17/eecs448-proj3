//Object that holds all test functions
let tests = {
	/*
	* tests related to word database preparation
	*/
	isEnglishWord: function () {
		let testMessage = "(word check)\nEnglish words are accepted by word database: ";	
		var str = 'zwitterion';
		return testMessage + passOrFail(isWord(str));
	},
	
	isNotEnglishWord: function () {
		let testMessage = "(word check)\nNon-english words are rejected by word database: ";	
		var str = 'affluentic'; //non-English word
		return testMessage + passOrFail(!isWord(str));
	},
	
	smallWords: function () {
		let testMessage = "(anagrams minigame)\nUser string inputs less than 3 are rejected: ";
		document.getElementById("randoLetters").textContent = testLetters();
		document.getElementById("inputWord").value = "is"//word is english and in testLetters bank, but only 2 letters long
		
		validLetters();
		
		let result = passOrFail(longest != "IS");
		
		return testMessage + result;
	},
	
	notInWordBank: function () {
		let testMessage = "(anagrams minigame)\nUser string inputs made of letters not in letter bank are rejected: ";
		document.getElementById("randoLetters").textContent = testLetters();
		document.getElementById("inputWord").value = "ploy"//word is english and >= 3 letters, but not in letter bank
		
		validLetters();
		
		let result = passOrFail(longest != "PLOY");
		
		return testMessage + result;
	},
	
	EachLetterUsedOnce: function () {
		let testMessage = "(anagrams minigame)\nDuplicate letters not allowed if letter bank does not have more than one: ";
		document.getElementById("randoLetters").textContent = testLetters();
		document.getElementById("inputWord").value = "APPLE"//word is english and >= 3 letters, but only one p is in the letter bank
		
		validLetters();
		
		let result = passOrFail(longest != "APPLE");
		
		return testMessage + result;
	},
	
	newLongestWord: function () {
		let testMessage = "(anagrams minigame)\nA valid user input word replaces the current longest word if longer: ";
		
		document.getElementById("randoLetters").textContent = testLetters();
		document.getElementById("inputWord").value = "able"//word is valid based on testLetters letter bank
		
		longest = "age"; //smaller than 'able'
		
		validLetters();
		let result = passOrFail(longest == "ABLE");
		
		return testMessage + result;
	},
	
	shorterThanLongest: function () {
		let testMessage = "(anagrams minigame)\nA valid user input word does not replace longest word if shorter: ";
		
		document.getElementById("randoLetters").textContent = testLetters();
		document.getElementById("inputWord").value = "able"//word is valid based on testLetters letter bank
		
		longest = "green"; //bigger than 'able'
		
		validLetters();
		let result = passOrFail(longest == "green");
		
		return testMessage + result;
	},
	
	preventTurnRestart: function () {
		let testMessage = "(anagrams minigame) Player cannot restart minigame while current minigame instance is playing: ";
		
		longest = "aaaaa";
		isTurn = true;
		
		clickToStart();
		
		let result = passOrFail(longest != "");
		
		return testMessage + result;
	},
	
	specialSpaceMovesPlayer: function () {
		let testMessage = "(special spaces)\nwhen player lands on specArr[3]'s origin space, they are moved to its end space: ";
		let testSpecial = specArr[3];
		let testPlayer = 1;
		let testMoveValue = 1;
		
		boardArr[testSpecial.origin - 1] = testPlayer;
		setPos(testMoveValue, testPlayer);
		
		let result = passOrFail(boardArr[testSpecial.end] == testPlayer);
		
		return testMessage + result;
	},
	
	playerSwapPosWhenLandedOn: function () {
		let testMessage = "(player movement)\nWhen a player lands on opponent, the opponent is sent back to the player's original space: ";
		let testPlayer = 1;
		let testPlayerPos = 8;
		let testOppPos = 10;
		let testOpp = 2;
		let testMoveValue = testOppPos - testPlayerPos;
		
		boardArr[testPlayerPos] = testPlayer;
		boardArr[testOppPos] = testOpp;
		setPos(testMoveValue, testPlayer);

		let result = passOrFail(boardArr[testPlayerPos] == testOpp && boardArr[testOppPos] == testPlayer);
		return testMessage + result;
	},
	
	PlayerMovePastEnd: function () {
		let testMessage = "(player movement)\nPlayer moves to last space if they would normally move past: "
		let testPlayer = 1;
		let endSpace = boardArr.length - 1;
		
		boardArr[endSpace-1] = testPlayer;
		let testMoveValue = 5;
		
		setPos(testMoveValue, testPlayer);
		let result = passOrFail(boardArr[99] == testPlayer);
		console.log(boardArr);
		
		return testMessage + result;
	},
	
	moveBasedOnStringLength: function () {
		let testMessage = "(player movement)\nPlayer moves a number of spaces equal to length of longest word found: ";
		longest = "aaa"; //three spaces
		let testPlayer = 1;
		
		startPlay(2);
		playGame();
		let result = passOrFail(boardArr[3] == testPlayer);
		
		return testMessage + result;
	},
	
	winConditionMet: function() {
		let testMessage = "(player movement)\nPlayer wins when the last space is reached: ";
		
		startPlay(2);
		boardArr[95] = 1;
		longest = "aaaa";
		
		playGame();

		let result = passOrFail(gameFinished);
		
		return testMessage + result;
	}
}
/*
*	@return static letter bank for testing
**/
function testLetters() {
	return "SIAPLEBYTB";
}
/**
*	@post global variables used in testing are reset to initial values
*/
function resetValues() {
	document.getElementById("randoLetters").textContent = "";
	document.getElementById("inputWord").textContent
	longest = '';
	playerTurn = 0;
	playerArr = [];
	
	for (let i = 0; i < boardArr.length; i++) {
		let space = boardArr[i];
		if (space != 0 && space != WORMHOLE && space != BLACK_HOLE)
			boardArr[i] = 0;
	}
	
	console.log(boardArr.length);
}
/**
*	@return 'PASS' or 'FAIL' based on testPassed's value
*	@param testPassed boolean value that represents the test result.
*/
function passOrFail(testPassed) {
	if (testPassed)
		return "PASS";
		
	return "FAIL";
}

/**
*	@post test information and result printed to browser console.
*/
function printTest(testFun, testNum) {
	console.log("Test " + (testNum+1) + ": " + testFun());
}

/**
* 	@post all tests are ran
*/
function runTests() {
	console.log("\nRunning Tests:");
	let testArr = Object.values(tests);
	testArr.forEach((element, index) => {printTest(element, index); resetValues()});
}
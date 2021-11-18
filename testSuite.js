//Object that holds all test functions
let tests = {
	/*
	* tests related to word database preparation
	*/
	validWord: function () {
		let testMessage = "(word check)\nInput strings matching valid english words are accepted: ";	
		var str = 'zwitterion';
		return testMessage + passOrFail(isWord(str));
	},
	
	invalidWord: function () {
		let testMessage = "(word check)\nInput strings not matching valid english words are rejected: ";	
		var str = 'affluentic';
		return testMessage + passOrFail(!isWord(str));
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
}

/**
*	@post global variables used in testing are reset to initial values
*/
function resetValues() {
	for (let i = 0; i < boardArr.length; i++) {
		let space = boardArr[i];
		if (space != 0 && space != WORMHOLE && space != BLACK_HOLE)
			boardArr[i] = 0;
	}
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
//Object that holds all test functions
let tests = {
	/*
	* tests related to word database preparation
	*/
	validWord: function () {
		let testMessage = "(word check)\ninput strings matching valid english words are accepted: ";	
		var str = 'zwitterion';
		return testMessage + passOrFail(isWord(str));
	},
	
	invalidWord: function () {
		let testMessage = "(word check)\ninput strings not matching valid english words are rejected: ";	
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
}

function resetValues() {
	for (let i = 0; i < boardArr.length; i++) {
		let space = boardArr[i];
		if (space != 0 || space != WORMHOLE || space != BLACK_HOLE)
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
	testArr.forEach(printTest);
}
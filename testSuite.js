//Object that holds all test functions
let tests = {
	/*
	* tests related to word check
	*/
	
	validWord: function () {
		let testMessage = "(word check)\ninput strings matching valid english words are accepted: ";	
		var str = 'zwitterion';
		let result = isWord(str);
		
		return testMessage + passOrFail(result);
	},
	
	inValidWord: function () {
		let testMessage = "(word check)\ninput strings not matching valid english words are rejected: ";	
		var str = 'affluentic';
		let result = !isWord(str);
		
		return testMessage + passOrFail(result);
	},
	
	SpecSpacesAssigned: function () {
		let testMessage = "(Special Spaces)\nSpecial spaces are assigned to boardArr: ";
		
		for (let i = 0; i < specArr.length; i++) {
			if (boardArr[specArr.origin] != specArr.type)
				return testMessage + passOrFail(false);
		}
		
		return testMessage + passOrFail(true);
	},
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
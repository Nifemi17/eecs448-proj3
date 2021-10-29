function printWin() {
	document.getElementById("winMessage").innerHTML = "Player " + boardArr[boardArr.length - 1] + " wins!!";
}

function playGame()
{
    word = lengthChecker();
    setPos(word,1);
	if (boardArr[boardArr.length - 1] != 0) {
		printWin();
	}
}


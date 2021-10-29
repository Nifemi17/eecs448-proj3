function printWin() {
	document.getElementById("winMessage").innerHTML = "Player " + boardArr[boardArr.length - 1] + " wins!!";
}

function playGame()
{
    setPos(longest.length,1);
	if (boardArr[boardArr.length - 1] != 0) {
		printWin();
	}
	
	userInput = '';
    isTurn = false;
	clearPic();
}


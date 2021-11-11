function printWin() {
	document.getElementById("winMessage").innerHTML = "Player " + boardArr[boardArr.length - 1] + " wins!!";
}

function playGame()
{
	context.clearRect(0,0,canvas.width,canvas.height);
    setPos(longest.length,1);
	
	if (boardArr[boardArr.length - 1] != 0) {
		printWin();
	}
	
	printBoard();
	drawSpecialSpaces();
	userInput = '';
    isTurn = false;
	clearPic();
}

function setPlayers(num) {
	numPlayers = num;
	console.log(numPlayers);
	document.getElementById("introBox").innerHTML = '<style= "display: hidden;/>';
	document.getElementById("mainCan").style.display = '';
	document.getElementById("mainGame").style.display = '';
	document.getElementById("randoLetters").style.display = '';
	document.getElementById("countdown").style.display = '';
	document.getElementById("longWord").style.display = '';
}
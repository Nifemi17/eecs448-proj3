function printWin() {
	document.getElementById("winMessage").innerHTML = "Player " + boardArr[boardArr.length - 1] + " wins!!";
}

function playGame(playerTurn)
{
	console.log("ewe")
	console.log(playerTurn)
	context.clearRect(0, 0, canvas.width, canvas.height);
	movePlayer(longest.length, playerArr[playerTurn+1].ID, playerArr[playerTurn+1].PC);
	if (boardArr[boardArr.length - 1] != 0) {
		printWin();
	}
	
	printBoard();
	context.clearRect(5, 380, 15, 15)
	printPlayers();
	
	userInput = '';
	isTurn = false;
	clearPic();
}

function setPlayers(num) {
	numPlayers = num;
	startPlay(numPlayers);
	console.log(numPlayers);
	document.getElementById("introBox").innerHTML = '<style= "display: hidden;/>';
	document.getElementById("mainCan").style.display = '';
	document.getElementById("mainGame").style.display = '';
	document.getElementById("randoLetters").style.display = '';
}
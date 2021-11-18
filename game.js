function printWin() {
	document.getElementById("winMessage").innerHTML = "Player " + boardArr[boardArr.length - 1] + " wins!!";
}

function playGame()
{
	console.log("ewe")
	console.log("playerTurn:", playerTurn)
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
	playerTurn++;
	if (playerTurn >= numPlayers)
		playerTurn = 0;
	document.getElementById("currentTurn").innerHTML = "Player " + (playerTurn+1) + "'s Turn";
}

function setPlayers(num) {
	numPlayers = num;
	startPlay(numPlayers);
	console.log(numPlayers);
	document.getElementById("introBox").innerHTML = '<style= "display: hidden;/>';
	document.getElementById("mainCan").style.display = '';
	document.getElementById("mainGame").style.display = '';
	document.getElementById("randoLetters").style.display = '';
	document.getElementById("turnInfo").style.display = '';
}
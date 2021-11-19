/**
*	@post winning player is printed to screen
*/
function printWin() {
	gameFinished = true;
	document.getElementById("currentTurn").innerHTML = "Player " + boardArr[boardArr.length - 1] + " wins!!";
	document.getElementById("turnStartButton").value = "Click to restart game";
}

/**
*	@post current turn's player is moved on board, next player indicated or win message printed
*/
function playGame()
{
	context.clearRect(0, 0, canvas.width, canvas.height);
	movePlayer(longest.length, playerArr[playerTurn+1].ID, playerArr[playerTurn+1].PC);
	
	
	printBoard();
	context.clearRect(5, 380, 15, 15)
	printPlayers();
	
	userInput = '';
	isTurn = false;
	clearPic();
	
	if (boardArr[boardArr.length - 1] != 0) {
		printWin();
	}
	
	else {
		playerTurn++;
		
		if (playerTurn >= numPlayers)
			playerTurn = 0;
		
		document.getElementById("currentTurn").innerHTML = "Player " + (playerTurn+1) + "'s Turn";
	}
}

/**
*	@pre number of players is selected by user
*	@post a Player object is created for each player, main game is displayed
*	@param num number of players playing
*/
function setPlayers(num) {
	numPlayers = num;
	startPlay(numPlayers);
	playerPieces(numPlayers);
	document.getElementById("introBox").innerHTML = '<style= "display: hidden;/>';
	document.getElementById("mainCan").style.display = '';
	document.getElementById("mainGame").style.display = '';
	document.getElementById("randoLetters").style.display = '';
	document.getElementById("turnInfo").style.display = '';
}
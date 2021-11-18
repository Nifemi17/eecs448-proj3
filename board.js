let boardArr = [];
for(let i = 99; i >= 0; i--)
    {
        boardArr[i] = 0;
    }

/**
 * 
 * @param {number} wordLength - amount of spaces to move the player
 * @param {player} Pidentifier - the plaer ID that is placed at the postion that the player exists.
 * @brief the function sets the position of the playe on the board array and switches player positions if one lands on another player
 */
function setPos(wordLength, Pidentifier)
{
    let oldPos = getPos(Pidentifier);
    for (let i = 0; i < 100; i++) 
    {
        if (boardArr[i] == Pidentifier)
        {
            boardArr[i] = 0;
        }
    }
    if((oldPos + wordLength) > 99)
    {
        boardArr[99] = Pidentifier;
    }
    else if (boardArr[oldPos + wordLength] > 4) { 
        oldoldPos = oldPos;
		oldPos += wordLength;
		wordLength = getRepositionValue(oldPos);
        if (boardArr[oldPos + wordLength] <= 4 && boardArr[oldPos + wordLength] > 0) {
            let otherPlayer = boardArr[oldPos + wordLength];
            boardArr[oldoldPos] = otherPlayer;
        }
	}
    else if (boardArr[oldPos + wordLength] <= 4 && boardArr[oldPos + wordLength] > 0) {
        let otherPlayer = boardArr[oldPos + wordLength];
        boardArr[oldPos] = otherPlayer;
    }
    boardArr[oldPos + wordLength ] = Pidentifier;
}

/**
 * 
 * @param {number} wordLength - the amount of space to move the player
 * @param {player object} Pidentifier - the player ID that is passed to the function to know which player is moving
 * @param {*} Pcolor - the color of the player that is being moved
 * @brief handles the player's movement on the board durin game play
 */
function movePlayer(wordLength, Pidentifier, Pcolor)
{
    let oldPos = getPos(Pidentifier);
    setPos(wordLength,Pidentifier);
    if((oldPos + wordLength) > 99)
    {
        context.fillStyle = Pcolor;
        context.fillRect(5,20,15,15);
    }
    for (let row = 0; row < 10; row++) 
    {
        for (let col = 0; col < 10; col++) 
        {
            spot = (row*10)+col;
            if(boardArr[spot] == Pidentifier)
            {   
                context.fillStyle = Pcolor;
                console.log(spot)
                if(row%2 == 0)
                {
                    context.fillRect(5 + col*50 ,380 -(row*40),15,15)
                }
                else if (row%2 == 1)
                {
                    context.fillRect(455- col*50 ,340 - ((row-1)*40),15,15)
                }
            }
        }
    }
}

/**
 * @pre the player has moved from the initial postion
 * @post to print the player, calls drawpiece and passes it the color, the row and column
 * at which the player is located.
 * @brief called when the canvas is cleared to re-draw ther player's postion
 */
// Just prints the player's position during movement after screen is cleared. 
 function printPlayers() {
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {

            spot = boardArr[(row * 10) + col]
            if (spot > 0 && spot < 5) {
                drawpiece(pColor[spot], row, col);
            }
        }
    }
}

/**
 * 
 * @param {number} Cols - the color the player piece should be
 * @param {number} row - the column that the player piece should be drawn at
 * @param {number} col - the column gthat the player piece shod be drawn at
 * @post a rectangle is drawn at the postion the player is located
 */

function drawpiece(Cols, row, col) {
    context.fillStyle = Cols
    if (row % 2 == 0) {
        context.fillRect(5 + col * 50, 380 - (row * 40), 15, 15)
    }
    else if (row % 2 == 1) {
        context.fillRect(455 - col * 50, 340 - ((row - 1) * 40), 15, 15)
    }
}

/**
 * 
 * @param {player object} Pidentifier - is used to locate the player on the board
 * @returns {number} - the position of the player on the board
 */
function getPos(Pidentifier)
{
    let PlayerPos = 0;
    for (let i = 0; i < 100; i++) 
    {
        if (boardArr[i] == Pidentifier)
        { 
            PlayerPos = i;
        }
    }
    return PlayerPos;
}

/**
 * @post prints the board postion numbers on the board grid
 */
function printPos()
{
    context.fillStyle = "red"
    context.fillRect(5,380,15,15)
    let pos = 1;
    for (let row = 0; row < 10; row++) 
    {
        for (let col = 0; col < 10; col++) 
        {
            context.fillStyle = "black"
            if(row % 2 == 0)
            {
                context.fillText(pos,5 + col*50 ,370 -(row*40));
            }
            else if (row % 2 == 1 )
            {
                context.fillText(pos,455- col*50 ,330 - ((row-1)*40));
            }
            pos++;
        }
    }
}

/**
 * @post prints the board grid on the page
 */
function printBoard()
{
	drawSpecialOrigins();
	
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(500,0);
    context.lineTo(500,400);
    context.lineTo(0,400);
    context.lineTo(0,0);
    for (let row = 0; row < 10; row++) 
    {
        context.moveTo(0,((row+1)*40));
        context.lineTo(500,((row+1)*40));
        for (let col = 0; col < 10; col++) 
        {
            context.moveTo((col+1)*50 , 0);
            context.lineTo((col+1)*50 , 400);
        }
    }
    context.strokeStyle = 'black';
    context.lineWidth = 3;
    context.stroke();
    context.closePath();
	drawSpecialLines();
	printPos();
    
}

/**
 * 
 * @param {number} numPlayers - number of players in the game
 * @brief this function prints the legend labeling player pieces and special spaces
 */
function playerPieces(numPlayers) {
	ctx.font = "15px serif";
	
	//Adds the player pieces to the legend
	for (let i = 1; i < playerArr.length; i++) {
		ctx.fillStyle = playerArr[i].PC;
		ctx.fillRect(45 + ((i-1)*115), 30, 20, 20);
		ctx.fillStyle = "black";
		ctx.fillText("Player " + i, 30+((i-1)*115), 70);
	}
	
	//the following code adds the special spaces to the legend
	ctx.fillStyle = WORMHOLE_FILLSTYLE;
	ctx.fillRect(110, 85, 30, 30);
	
	ctx.fillStyle = BLACK_HOLE_FILLSTYLE;
	ctx.fillRect(110, 135, 30, 30);
	
	ctx.fillStyle = "black";
	ctx.fillText("spaces move you forward", 150, 102);
	ctx.fillText("spaces move you backward", 150, 152);
	
}
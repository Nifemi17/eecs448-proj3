const WORMHOLE = 5; //Moves players forward by up to ten spaces
const WORMHOLE_FILLSTYLE = 'purple';
const BLACK_HOLE = 6; //Moves players back by up to ten spaces
const BLACK_HOLE_FILLSTYLE = 'black';
const ROW_NUM = 10; //total number of rows
const COL_NUM = 10; //total number of columns
/**
*	returns a number between min (included) and max (excluded).
**/
function getRandomInt(max, min) {
	return Math.floor(Math.random() * (max - min) + min);
}

/**
*	@pre boardArr is defined
*	@brief randomly generates special spaces on the board
**/
function setSpecialSpaces() {
	for (let i = 0; i < ROW_NUM; i++) {
		//j < 2 means 2 of each special space type per row
		for (let j = 0; j < 2; j++) {
			var rowMin = i*COL_NUM;
			var rowMax = rowMin + COL_NUM;
			var targetSpace = 0;
			var spaceType = j + 5;
			
			//sets the lowest possible space to 3 (4 on the board), since players won't land on any space before that.
			if (i == 0)
				rowMin += 3;
			
			if (spaceType == WORMHOLE)
				console.log("Special space: Wormhole");
			
			else if (spaceType == BLACK_HOLE)
				console.log("Special space: Black Hole")
			console.log("rowMin:", rowMin);
			console.log("rowMax:", rowMax);
			
			//chooses a blank space that isn't the start or end
			do {
				targetSpace = getRandomInt(rowMax, rowMin);
				console.log("Board space (targetSpace+1):", targetSpace + 1);
			} while (targetSpace <= 0 || targetSpace >= boardArr.length-1 || boardArr[targetSpace] != 0)
		
			console.log('\n');
			//prevents wormholes from spawning in the final row
			if (spaceType == WORMHOLE && i < ROW_NUM - 1) {
				boardArr[targetSpace] = WORMHOLE;
			}
			
			else if (spaceType == BLACK_HOLE) {
				boardArr[targetSpace] = BLACK_HOLE;
			}
		}
	}
	
	drawSpecialSpaces();
}

/**
*	@pre special spaces has been generated
*	@post special space graphics drawn on game board
**/
function drawSpecialSpaces() {
	for (let i = 0; i < ROW_NUM; i++) {
		for (let j = 0; j < COL_NUM; j++) {
			let space = boardArr[(i*COL_NUM)+j];
			
			if (space > 4) {
				context.beginPath();
				if(space == WORMHOLE) 
					context.fillStyle = WORMHOLE_FILLSTYLE;
		
				else if(space == BLACK_HOLE) 
					context.fillStyle = BLACK_HOLE_FILLSTYLE;
				
				if(i%2 == 0) {
					context.arc((j*50)+12.5, 387.5-(i*40), 7.5, 0, 2*Math.PI);
				}
				
				else if(i%2 == 1) {
					context.arc(462.5-(j*50), 387.5-(i*40), 7.5, 0, 2*Math.PI);
				}

				context.closePath();
				context.fill();
			}
		}
	}
}


/**
*	@pre a special space has been landed on
*	@return number of spaces player must move forward/back
*	@param currentSpace the space number the player has landed on
**/
function getRepositionValue(currentSpace) {

	let moveValue = getRandomInt(10,1);

	let startSpace = 0;
	let endSpace = boardArr.length - 1;
	let moveBack = 0;
	
	if (boardArr[currentSpace] == BLACK_HOLE) {
		console.log("Landed on a Black Hole!");
		moveValue *= -1;
		moveBack = 1;
	}
	
	else
		console.log("Landed on a Wormhole!");
	
	console.log("currentSpace:", currentSpace);
	
	do {
		var newSpace = currentSpace + moveValue;
		console.log("moveValue:", moveValue);	
		console.log("newSpace:", newSpace);
		
		if (newSpace > endSpace)
			return (endSpace - currentSpace);
		
		else if (newSpace < startSpace)
			return (currentSpace * -1);
		
		if (boardArr[newSpace] != 0) {
			if (moveBack)
				moveValue--;
			
			else
				moveValue++;
		}
	} while (boardArr[currentSpace + moveValue] != 0);
	
	return moveValue;
}
const WORMHOLE = 5; //Moves players forward by up to ten spaces
const WORMHOLE_FILLSTYLE = 'purple';
const BLACK_HOLE = 6; //Moves players back by up to ten spaces
const BLACK_HOLE_FILLSTYLE = 'black';

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
	let intervalSize = 10;
	
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 2; j++) {
			var intervalMin = i*intervalSize;
			var intervalMax = intervalMin + intervalSize;
			var targetSpace = 0;
			
			//sets the lowest possible space to 3 (4 on the board), since players won't land on any space before that.
			if (i == 0)
				intervalMin += 3;
			
			if (j+5 == WORMHOLE)
				console.log("Special space: Wormhole");
			
			else if (j+5 == BLACK_HOLE)
				console.log("Special space: Black Hole")
			console.log("intervalMin:", intervalMin);
			console.log("intervalMax:", intervalMax);
			
			//chooses a blank space that isn't the start or end
			do {
				targetSpace = getRandomInt(intervalMax, intervalMin);
				console.log("Board space (targetSpace+1):", targetSpace + 1);
			} while (targetSpace == 0 || targetSpace == boardArr.length-1 || boardArr[targetSpace] != 0)
		
			console.log('\n');
			if (j+5 == WORMHOLE && i < 2) {
				boardArr[targetSpace] = WORMHOLE;
			}
			
			else if (j+5 == BLACK_HOLE) {
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
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 10; j++) {
			
			context.beginPath();
			if(boardArr[(i*10)+j] == WORMHOLE) {
				context.fillStyle = WORMHOLE_FILLSTYLE;
			
				if(i%2 == 0) {
					context.arc((j*50)+12.5, 107.5-(i*40), 7.5, 0, 2*Math.PI);
				}
				
				else if(i%2 == 1) {
					context.arc(462.5-(j*50), 107.5-(i*40), 7.5, 0, 2*Math.PI);
				}
			}
		
			else if(boardArr[(i*10)+j] == BLACK_HOLE) {
				context.fillStyle = BLACK_HOLE_FILLSTYLE;
			
				if(i%2 == 0) {
					context.arc((j*50)+12.5, 107.5-(i*40), 7.5, 0, 2*Math.PI);
				}
				
				else if(i%2 == 1) {
					context.arc(462.5-(j*50), 107.5-(i*40), 7.5, 0, 2*Math.PI);
				}
			}
			context.closePath();
			context.fill();
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
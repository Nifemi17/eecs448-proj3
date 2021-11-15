const WORMHOLE = 5; //Moves players forward by up to ten spaces
const WORMHOLE_FILLSTYLE = 'purple';
const BLACK_HOLE = 6; //Moves players back by up to ten spaces
const BLACK_HOLE_FILLSTYLE = 'black';
const ROW_NUM = 10; //total number of rows
const COL_NUM = 10; //total number of columns

var specArr = []; //SpecSpace object array to store the start and end spaces of all special spaces.


class SpecSpace {
	constructor (originSpace, endSpace) {
		this.origin = originSpace; //special space's number
		this.end = endSpace; //space player must move to when landing on this special space.
	}
	
	//returns difference between the origin and end spaces
	get spaceDiff () {
		console.log("origin:", this.origin);
		console.log("end:", this.end);
		console.log ("diff val:", this.end - this.origin);
		return this.end - this.origin;
	}
}

function getOffset() {
	let colNum = 10;
	let rowOffset = getRandomInt(4,1);
	let colOffset = getRandomInt(2, -1);
	let totalOffset = (colNum * rowOffset) + colOffset;
	
	return totalOffset;
}

function setEnd(originSpace) {
	let offset = getOffset();
	
	let firstBoardSpace = 0; //space number of board's start
	let lastBoardSpace = boardArr.length - 1; //space number of board's end
	let moveBack = 0;
	
	if (boardArr[originSpace] == BLACK_HOLE) {
		offset *= -1;
		moveBack = 1;
	}
	
	do {
		var target = originSpace + offset; //end space players will move to
		console.log("offset value:", offset);	
		
		if (target > lastBoardSpace)
			return lastBoardSpace;
		
		else if (target < firstBoardSpace)
			return firstBoardSpace;
		
		if (boardArr[target] != 0) {
			if (moveBack)
				offset--;
			
			else
				offset++;
		}
	} while (boardArr[target] != 0);
	
	return target;
}

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
	let ctr = 0; //tracks how many special spaces have been made
	
	for (let i = 0; i < ROW_NUM; i++) {
		//j < 2 means 2 of each special space type per row
		for (let j = 0; j < 2; j++) {
			var rowMin = i*COL_NUM;
			var rowMax = rowMin + COL_NUM;
			var originSpace = 0;
			var endSpace = -1;
			var spaceType = j + 5;
			
			//sets the lowest possible space to 3 (4 on the board), since players won't land on any space before that.
			if (i == 0)
				rowMin += 3;
			
			console.log("rowMin:", rowMin);
			console.log("rowMax:", rowMax);
			
			//chooses a blank space that isn't the start or end
			do {
				originSpace = getRandomInt(rowMax, rowMin);
			} while (originSpace <= 0 || originSpace >= boardArr.length-1 || boardArr[originSpace] != 0)
		
			//prevents wormholes from spawning in the final row
			if (spaceType == WORMHOLE && i < ROW_NUM - 1) {
				boardArr[originSpace] = WORMHOLE;
				console.log("Special space: Wormhole");
			}
			
			else if (spaceType == BLACK_HOLE) {
				boardArr[originSpace] = BLACK_HOLE;
				console.log("Special space: Black Hole");
			}
			
			endSpace = setEnd(originSpace);
			
			console.log("originSpace + 1:", originSpace + 1);
			console.log("endSpace + 1:", endSpace + 1);
			console.log('\n');
			
			specArr[ctr] = new SpecSpace(originSpace, endSpace);
			ctr++;
			
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
	console.log("currentSpace:", currentSpace);
	for (let i = 0; i < specArr.length + 1; i++) {
		console.log("specArr[i].origin:", specArr[i].origin)
		console.log(specArr[i].origin == currentSpace);
		if (specArr[i].origin == currentSpace) {
			console.log("got here:", i);
			return specArr[i].spaceDiff;
		}
	}
}
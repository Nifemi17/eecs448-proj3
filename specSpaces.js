const WORMHOLE = 5; //Moves players forward by up to ten spaces
const WORMHOLE_FILLSTYLE = 'pink';
const BLACK_HOLE = 6; //Moves players back by up to ten spaces
const BLACK_HOLE_FILLSTYLE = 'purple';
const ROW_NUM = 10; //total number of rows
const COL_NUM = 10; //total number of columns

var specArr = []; //SpecSpace object array


class SpecSpace {
	constructor (originSpace, endSpace, spaceType, c) {
		this.origin = originSpace; //special space's number
		this.end = endSpace; //space player must move to when landing on this special space.
		this.type = spaceType; //number distinguishing type of special space (5 or 6)	
		this.color = c; //color of special space
	}
	
	//returns difference between the origin and end spaces
	get spaceDiff () {
		console.log("origin:", this.origin);
		console.log("end:", this.end);
		console.log ("diff val:", this.end - this.origin);
		return this.end - this.origin;
	}
}

function getXPos(row, col) {
	if (row%2 == 0)
		return (col*50)+12.5;
	
	else 
		return 462.5-(col*50);
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
	//special spaces given constant values
	specArr[0] = new SpecSpace(6, 25, WORMHOLE, WORMHOLE_FILLSTYLE);
	specArr[1] = new SpecSpace(37, 57, WORMHOLE, WORMHOLE_FILLSTYLE);
	specArr[2] = new SpecSpace(46, 77, WORMHOLE, WORMHOLE_FILLSTYLE);
	specArr[3] = new SpecSpace(68, 92, WORMHOLE, WORMHOLE_FILLSTYLE);
	specArr[4] = new SpecSpace(39, 3, BLACK_HOLE, BLACK_HOLE_FILLSTYLE);
	specArr[5] = new SpecSpace(56, 16, BLACK_HOLE, BLACK_HOLE_FILLSTYLE);
	specArr[6] = new SpecSpace(71, 19, BLACK_HOLE, BLACK_HOLE_FILLSTYLE);
	specArr[7] = new SpecSpace(98, 64, BLACK_HOLE, BLACK_HOLE_FILLSTYLE);
	
	for (let i = 0; i < specArr.length; i++) {
		boardArr[specArr[i].origin] = specArr[i].type;
	}
	
	drawSpecialSpaces();
}

/**
*	@pre special spaces has been generated
*	@post special space graphics drawn on game board
**/
function drawSpecialSpaces() {
	for (let i = 0; i < specArr.length; i++) {
		let originCol = specArr[i].origin % COL_NUM;
		let originRow = (specArr[i].origin - originCol) / ROW_NUM;
		let endCol = specArr[i].end % COL_NUM;
		let endRow = (specArr[i].end - endCol) / ROW_NUM;
		
		console.log('\n');
		console.log("origin:", specArr[i].origin);
		console.log("end:", specArr[i].end);
		console.log("originCol:", originCol);
		console.log("originRow:", originRow);
		console.log("endCol:", originCol);
		console.log("endRow:", originRow);
		
		//Draw the special space origin
		context.beginPath();
		context.fillStyle = specArr[i].color;
		context.arc(getXPos(originRow, originCol), 387.5-(originRow*40), 7.5, 0, 2*Math.PI);
		context.closePath();
		context.fill();
		
		//draw line to end space
		context.beginPath();
		context.strokeStyle = specArr[i].color;
		context.moveTo(getXPos(originRow, originCol), 387.5-(originRow*40));
		context.lineTo(getXPos(endRow, endCol), 387.5-(endRow*40));
		context.stroke();
		
		//draw the arrow at end of line
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
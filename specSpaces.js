const WORMHOLE = 5; //Moves players forward by a predetermined amount
const WORMHOLE_FILLSTYLE = 'pink';
const BLACK_HOLE = 6; //Moves players back by a predetermined amount
const BLACK_HOLE_FILLSTYLE = 'purple';
const ROW_NUM = 10; //total number of rows
const COL_NUM = 10; //total number of columns

var specArr = []; //SpecSpace object array

//stores information for a special space
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

/**
* @return x value of top left corner of space (with offset)
**/
function getXPos(row, col, offset) {
	if (row%2 == 0)
		return (col*50) + offset;
	
	else 
		return 450 + offset -(col*50);
}

/**
*	@pre boardArr is defined
*	@brief sets special spaces at static locations on the board
*	@post special spaces are created, types are assigned to corresponding boardArr elements
**/
function setSpecialSpaces() {
	let elemNum = 0
	//special spaces given constant values
	specArr[elemNum++] = new SpecSpace(6, 25, WORMHOLE, WORMHOLE_FILLSTYLE);
	specArr[elemNum++] = new SpecSpace(37, 57, WORMHOLE, WORMHOLE_FILLSTYLE);
	specArr[elemNum++] = new SpecSpace(46, 77, WORMHOLE, WORMHOLE_FILLSTYLE);
	specArr[elemNum++] = new SpecSpace(65, 87, WORMHOLE, WORMHOLE_FILLSTYLE);
	specArr[elemNum++] = new SpecSpace(15, 34, WORMHOLE, WORMHOLE_FILLSTYLE);
	specArr[elemNum++] = new SpecSpace(29, 51, WORMHOLE, WORMHOLE_FILLSTYLE);
	
	specArr[elemNum++] = new SpecSpace(39, 3, BLACK_HOLE, BLACK_HOLE_FILLSTYLE);
	specArr[elemNum++] = new SpecSpace(56, 16, BLACK_HOLE, BLACK_HOLE_FILLSTYLE);
	specArr[elemNum++] = new SpecSpace(71, 19, BLACK_HOLE, BLACK_HOLE_FILLSTYLE);
	specArr[elemNum++] = new SpecSpace(98, 64, BLACK_HOLE, BLACK_HOLE_FILLSTYLE);
	specArr[elemNum++] = new SpecSpace(32, 13, BLACK_HOLE, BLACK_HOLE_FILLSTYLE);
	specArr[elemNum++] = new SpecSpace(84, 59, BLACK_HOLE, BLACK_HOLE_FILLSTYLE);
	
	for (let i = 0; i < specArr.length; i++) {
		boardArr[specArr[i].origin] = specArr[i].type;
	}
}

/**
*	@pre special spaces has been generated
*	@post special space origin graphics drawn on game board
**/
function drawSpecialOrigins() {
	for (let i = 0; i < specArr.length; i++) {
		let originCol = specArr[i].origin % COL_NUM;
		let originRow = (specArr[i].origin - originCol) / ROW_NUM;
		let endCol = specArr[i].end % COL_NUM;
		let endRow = (specArr[i].end - endCol) / ROW_NUM;
		
		//Draw the special space origin
		context.fillStyle = specArr[i].color;
		context.fillRect(getXPos(originRow, originCol, 0), 360-(originRow*40), 50, 40);
		
		
	}
}

/**
*	@pre special spaces already set
*	@post draws lines to the end space for each special space
*/
function drawSpecialLines() {
	for (let i = 0; i < specArr.length; i++) {
		let originCol = specArr[i].origin % COL_NUM;
		let originRow = (specArr[i].origin - originCol) / ROW_NUM;
		let endCol = specArr[i].end % COL_NUM;
		let endRow = (specArr[i].end - endCol) / ROW_NUM;
	
		//draw line to end space
		context.beginPath();
		context.strokeStyle = specArr[i].color;
		context.moveTo(getXPos(originRow, originCol, 25), 380-(originRow*40));
		context.lineTo(getXPos(endRow, endCol, 25), 380-(endRow*40));
		context.stroke();
	}
}

/**
*	@pre a special space has been landed on
*	@return number of spaces player must move forward/back
*	@param currentSpace the space number the player has landed on
**/
function getRepositionValue(currentSpace) {
	for (let i = 0; i < specArr.length + 1; i++) {
		if (specArr[i].origin == currentSpace) {
			return specArr[i].spaceDiff;
		}
	}
}
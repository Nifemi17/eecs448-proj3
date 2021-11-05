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
*	randomly sets the special spaces on the board
**/
function setSpecialSpaces() {
	let intervalSize = 10;
	
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 2; j++) {
			var intervalMin = i*intervalSize;
			var intervalMax = intervalMin + intervalSize;
			var targetSpace = 0;
			
			//sets the lowest possible space to 4, since players won't land on any space below that.
			if (i == 0)
				intervalMin += 4;
			
			console.log("special space:", j+5);
			console.log("intervalMin:", intervalMin);
			console.log("intervalMax:", intervalMax);
			
			//chooses a blank space that isn't the start or end
			do {
				targetSpace = getRandomInt(intervalMax, intervalMin);
				console.log("targetSpace:", targetSpace);
			} while (targetSpace == 0 || targetSpace == boardArr.length-1 || boardArr[targetSpace] != 0)
		
			console.log('\n');
			if (j+5 == WORMHOLE) {
				boardArr[targetSpace] = WORMHOLE;
			}
			
			else if (j+5 == BLACK_HOLE) {
				boardArr[targetSpace] = BLACK_HOLE;
			}
		}
	}
	
	drawSpecialSpaces();
}

function drawSpecialSpaces() {
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 10; j++) {
			console.log("checking space", (i*10)+j+1, ":", boardArr[(i*10)+j]);
			
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
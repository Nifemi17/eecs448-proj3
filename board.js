let boardArr = [];
for(let i = 99; i >= 0; i--)
    {
        boardArr[i] = 0;
    }

function setPos(wordLength, Pidentifier)
{
    movePlayer(wordLength, Pidentifier)
    console.log(wordLength);
}
function movePlayer(wordLength, Pidentifier)
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
        context.fillStyle = "red";
        context.fillRect(5,20,15,15);
    }

    else if (boardArr[oldPos + wordLength] > 4) { 
		oldPos += wordLength;
		wordLength = getRepositionValue(oldPos);
	}
	
	boardArr[oldPos + wordLength ] = Pidentifier;
	
    for (let row = 0; row < 10; row++) 
    {
        for (let col = 0; col < 10; col++) 
        {
            spot = (row*10)+col;
            if(boardArr[spot] == Pidentifier)
            {   
                context.fillStyle = "red"
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

function printBoard()
{
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
    printPos();
}
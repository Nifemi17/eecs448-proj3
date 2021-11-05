let boardArr = [];
for(let i = 29; i >= 0; i--)
    {
        boardArr[i] = 0;
    }

function setPos(wordLength, Pidentifier)
{
    context.clearRect(5,100,15,15)
    console.log(wordLength);
    let oldPos = getPos(Pidentifier);
    console.log(oldPos);
    for (let i = 0; i < 30; i++) 
    {
        //console.log(boardArr[i]);
        if (boardArr[i] == Pidentifier)
        {
            boardArr[i] = 0;
            if(i >= 0 && i< 10)
                {
                    context.clearRect(i*50 + 5,100,15,15);
                }
                else if(i>=10 && i < 20)
                {
                    context.clearRect((20 -i)*50 -45,60,15,15)
                }
                else
                {
                    context.clearRect(((i-20)*50)+5 ,20,15,15)
                }
        }
    }

    if((oldPos + wordLength) > 29)
    {
		boardArr[29] = Pidentifier;
        context.fillStyle = "red";
        context.fillRect(460,20,15,15);
    }
	
	else { 
		if (boardArr[oldPos + wordLength] > 4) {
			oldPos += wordLength;
			wordLength = getRepositionValue(oldPos);
		}
		
		boardArr[oldPos + wordLength ] = 1;
	}
    for (let i = 0; i < 30; i++) 
    {
        if(boardArr[i] == Pidentifier)
        {
                if(i >= 0 && i< 10)
                {
                    context.fillStyle = "red"
                    context.fillRect((i*50) +5,100,15,15)
                }
                else if(i>=10 && i < 20)
                {
                    context.fillStyle = "red"
                    context.fillRect((20 -i)*50 -45,60,15,15)
                }
                else 
                {
                    console.log("here or are we")
                    console.log(((i-20)*50)+10)
                    context.fillStyle = "red"
                    console.log(i)
                    context.fillRect(((i-20)*50)+5 ,20,15,15)
                    context.stroke()
                }
        }
    }
    for (let i = 0; i < 30; i++) 
    {
        console.log("boardArr[", i, "]:", boardArr[i]);
    }
}

function getPos(Pidentifier)
{
    let PlayerPos = 0;
    for (let i = 0; i < 30; i++) 
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
    context.fillRect(5,100,15,15)
    let pos = 1;
    for (let row = 0; row < 3; row++) 
    {
        for (let col = 0; col < 10; col++) 
        {
            context.fillStyle = "black"
            if(row == 0)
            {
                context.fillText(pos,5 + col*50 ,90);
                
            }
            else if (row == 1 )
            {
                context.fillText(pos,455- col*50 ,50);
            }
            else
            {
                context.fillText(pos,5+ col*50 ,10);
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
    context.lineTo(500,120);
    context.lineTo(0,120);
    context.lineTo(0,0);

    /**context.moveTo(100,150);

    context.lineTo(600,150);
    context.lineTo(600,270);
    context.lineTo(100,270);
    context.lineTo(100,150);*/
    for (let row = 0; row < 3; row++) 
    {
        context.moveTo(0,((row+1)*40));
        context.lineTo(500,((row+1)*40));
        for (let col = 0; col < 10; col++) 
        {
            context.moveTo((col+1)*50 , 0);
            context.lineTo((col+1)*50 , 120);
        }
    }
    context.strokeStyle = 'black';
    context.lineWidth = 3;
    context.stroke();
    context.closePath();
    printPos();
    
    /**boardArr[4] = 1;
    work = getPos(1);
    setPos(4,1);
    newPos = getPos(1)
    console.log(newPos)
    console.log(work);*/

}

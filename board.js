/*
 * This class would hold an array of integers that would represent the different position on the board 
 * When a player or a special position is placed on it, the number would change to
 * the correspondin g place holder number
 * 
 */

    let boardArr = []; // This array is the board array of 0 integers and eventually the special spaces
    // This for loop creates the board array backwards just for the intention of how we viewed the board
    for(let i = 10; i > 0; i--)
    {
        boardArr[i] = 0;
    }
    
        /**
         * visuals on the board positions
         * 10 9 8 7 6 
         * 1  2 3 4 5
         */
        
    function setPos(pos)
    {
        // checking from the beginning of the array 
        // Checks to see if there is already a one in the array and if so, changes it to 0 before assigning the new position.
        for(let i = 1; i < 11; i++)
        {
            if(boardArr[i] == 1)
            {
                boardArr[i] = 0;
            }
        }
        
        let oldPos = getPos(pos);
        if(oldPos == 0)
        {
            boardArr[pos] = 1;
        }
        //console.log(boardArr[pos]);
            for(let i = 10; i > 0; i--)
            {
            console.log(boardArr[i]);
            }
    }
    function getPos(pos)
    {
        if(pos < 11 && pos > 0)
        {
            return boardArr[pos];
        }
        else 
        return;
    }
 
 // player 1 has a word length word of 5 so it moves to the line 
 function tryPrint()
 {
    for(let i = 10; i > 0; i--)
    {
        console.log(boardArr[i]);
    }
    // Player moved to position 5 cause they spelt booze
    // so we set the positon
    // prints 5 0's a one and 4 0's
    setPos(5);
    // Print what player is at that point
    // returns 1
    console.log(getPos(5));
    // Player now spelt four more words and moved up 4 spaces so we set that position
    //prints one 0, then a 1 then 8 o's
    setPos(9);
    // This should say 0 because player should ony exist at one spot in the board
    // returns 0
    console.log(getPos(5));
    context.fillText(10 , 110, 160);
    context.fillText(9 , 160, 160);
    context.fillText(8 , 210, 160);
    context.fillText(7 , 260, 160);
    context.fillText(6 , 310, 160);
    context.fillText(5 , 310, 200);
    context.fillText(4 , 260, 200);
    context.fillText(3 , 210, 200);
    context.fillText(2 , 160, 200);
    context.fillText(1 , 110, 200);
    context.beginPath();
    context.moveTo(100,150);
    context.lineTo(350,150);
    context.lineTo(350,230);
    context.lineTo(100,230);
    context.lineTo(100,150);
    context.lineTo(150,150);
    context.moveTo(150,150);
    context.lineTo(150,230);
    context.moveTo(200,150);
    context.lineTo(200,230);
    context.moveTo(250,150);
    context.lineTo(250,230);
    context.moveTo(300,150);
    context.lineTo(300,230);
    context.moveTo(100,190);
    context.lineTo(350,190);
    context.strokeStyle = 'black';
    context.lineWidth = 3;
    context.stroke();
    context.closePath();
 }
 
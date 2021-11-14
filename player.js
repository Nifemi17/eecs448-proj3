class Players {
    constructor(playerID, playerColor) {
        this.ID = playerID;
        this.PC = playerColor;
    }
}

let pColor = [0,"red", "blue", "green", "purple"]
let playerArr = [];
function startPlay(numPlayers)
{
    for(let i=1; i<= numPlayers; i++)
    {
        playerArr[i] = new Players(i , pColor[i])
    }
}


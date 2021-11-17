class Players {
    constructor(playerID, playerColor) {
        this.ID = playerID;
        this.PC = playerColor;
    }
}

let pColor = [0,"red", "blue", "green", "purple"]
let playerArr = [];
/**
 * 
 * @param {number} numPlayers - this the number of players in the game
 * @brief it is passed the number of players in the game and creates that many player objects.
 */
function startPlay(numPlayers)
{
    for(let i=1; i<= numPlayers; i++)
    {
        playerArr[i] = new Players(i , pColor[i])
    }
}


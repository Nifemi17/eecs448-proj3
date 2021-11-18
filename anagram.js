
/**
 * @pre the player has clicked the start button
 * @post begins timer and calls random letters to be decided
 * @brief called when player starts came
 */
function clickToStart() {
    if (isTurn == false) {
        isTurn = true;
        document.getElementById("longWord").innerHTML = "Longest word is: ";
        longest = '';
        letters();
        startTimer();
    }
}


/**
 * @pre called by the start game button
 * @post outputs random letters according to certain scrabble parameters
 * @brief letters used for anagram game
 */
//Scrabble distribution
//A-9, B-2, C-2, D-4, E-12, F-2, G-3, H-2, I-9, J-1, K-1, L-4, M-2, N-6, O-8, P-2, Q-1, R-6, S-4, T-6, U-4, V-2, W-2, X-1, Y-2, Z-1
function letters() {
    var result = '';
    var characters = 'AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ';
    var charactersLength = characters.length;
    var randomNum = 0;
    for (var i = 0; i < 10; i++) {
        randomNum = Math.floor(Math.random() * charactersLength)
        result += characters.charAt(randomNum);
        characters = characters.slice(0, randomNum) + characters.slice(randomNum + 1, charactersLength);
        charactersLength = characters.length;
    }
    console.log(result);

    let container = document.getElementById("randoLetters");
    container.textContent = result;
}


/**
 * @pre called when the user presses "enter" when entering letters
 * @post outputs the longest word that the user inputs
 * @brief ensures letters are used correctly
 */
var userInput = '';
function validLetters() {
    var letters = '';

    let container1 = document.getElementById("randoLetters");
    let container2 = document.getElementById("inputWord");
    userInput = container2.value.toUpperCase();
    console.log("userInput:", userInput);
    letters = container1.textContent;

    var match;
    for (var i = 0; i < userInput.length; i++) {
        match = true;
        for (var j = 0; j < letters.length; j++) {
            if (userInput.charAt(i) == letters.charAt(j)) {
                //remove jth letter from list
                letters = letters.slice(0, j) + letters.slice(j + 1, letters.length);
                match = true;
                break;
            }
            else {
                match = false;
            }
        }
        if (!match) {
            break;
        }
    }
    if (isWord(userInput.toLowerCase()) && match && (userInput.length >= 3)) {
        longest = lengthChecker();
        greenCheck();
    }
    else {
        userInput = '';
        redX();
    }
    console.log("user input has valid letters:", match);
    console.log("user input is an english word and >= 3 letters: ", isWord(userInput.toLowerCase()));
    console.log('\n');
    document.getElementById("longWord").innerHTML = "Longest word is: " + longest;
}


/**
 * @pre called every time the user presses a key in the box
 * @post clears user input and calls valid letters
 * @brief enters the words into the system
 */
function pressEnter(e) {
    if (!e) e = window.event;
    var keyCode = e.code || e.key;
    if (keyCode == 'Enter') {
        // Enter pressed
        if (isTurn == true) {
            validLetters();
        }

        else {
            console.log("Word input error: isTurn == false");
        }
        clearUserInput();
    }
}

/**
 * @pre called when the user presses "enter" when entering letters
 * @post clears out the box where users input
 */
function clearUserInput() {
    document.getElementById("inputWord").value = "";
}


/**
 * @pre called when the user presses "enter" when entering letters
 * @post returns the longest word that the user inputs
 */
function lengthChecker() {
    console.log("user input is longer than longest word:", (userInput.length > longest.length));
    if (userInput.length > longest.length) {

        return userInput;
    }

    return longest;
}


/**
 * @pre called when the user presses the click to start button
 * @post switches the player turn and counts down the timer
 * @brief runs the timer and game
 */
let playerSwitch = 0;
function startTimer() {
    console.log(numPlayers)
    let playerTurn = 0;
    if (playerSwitch % numPlayers == 0) {
        playerTurn = 0
        playerSwitch = playerSwitch + 1
        //console.log(numPlayers)
    }
    else if (playerSwitch % numPlayers == 1) {
        playerTurn = 1
        playerSwitch++
    }
    else if (playerSwitch % numPlayers == 2) {
        playerTurn = 2
        playerSwitch++
    }
    else if (playerSwitch % numPlayers == 3) {
        playerTurn = 3;
        playerSwitch++
    }

    //1 1-sec interval + 14 1-sec intervals = 15-sec timer
    var timeleft = 14;
    document.getElementById("countdown").innerHTML = (timeleft + 1) + " seconds remaining";

    var downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            document.getElementById("countdown").innerHTML = "Finished";
            playGame(playerTurn);
        } else {
            document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
        }
        timeleft -= 1;
    }, 1000);
}

/**
 * @pre called when user inputs a valid word
 * @post green check is displayed on screen
 * @brief outputs a green check when called
 */
function greenCheck() {
    var div = document.getElementById('resultPic');
    div.innerHTML = '<img src="images/greenCheck.png" style="width:80px; height:auto; margin-top: -80px; margin-left: 85%;" />';
}

/**
 * @pre called when user inputs an invalid word
 * @post red X is displayed on screen
 * @brief outputs a red X when called
 */
function redX() {
    var div = document.getElementById('resultPic');
    div.innerHTML = '<img src="images/redX.png" style="width:80px; height:auto; margin-top: -80px; margin-left: 85%;" />';
}

/**
 * @pre called when user turn is over
 * @post nothing is displayed on screen
 * @brief outputs nothing
 */
function clearPic() {
    var div = document.getElementById('resultPic');
    div.innerHTML = '<img src="" />';
}

/**
 * @pre called when user presses the shuffle button
 * @post letters are randomized on the screen
 * @brief shuffles the random letters when the user needs them shuffled
 */
function shuffleLetters() {
    let container = document.getElementById("randoLetters");
    let word = '';
    word = container.textContent;
    var arr = word.split('');
    var n = arr.length;
    for (var i = 0; i < n - 1; ++i) {
        var j = Math.floor(Math.random() * n);
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    var shuffledWord = '';
    shuffledWord = arr.join('');
    container.textContent = shuffledWord;
}
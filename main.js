/*----------Constants---------------- */

const SOUND_EFFECT = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-small-hit-in-a-game-2072.mp3");
const PLAYERS = ["Player 1", "Player 2"];


const PLAYER_1_MOVEMENT_MAP = {
    7: 6, 6: 5, 5: 4, 4: 3, 3: 2, 2: 1, 1: 8,
    8: 9, 9: 10, 10: 11, 11: 12, 12: 13, 13: 7
};

const PLAYER_2_MOVEMENT_MAP = {
    8: 9, 9: 10, 10: 11, 11: 12, 12: 13, 13: 14, 14: 7,
    7: 6, 6: 5, 5: 4, 4: 3, 3: 2, 2: 8
};

/*----- app's state (variables) -----*/
let gameBoard = {};
let currentPlayerIndex = 0;
let unmovablePit = null;
let turnCounter = 0;



/*----- cached element references -----*/

const pits = document.querySelectorAll(".pit");
const playerDisplay = document.querySelector("#playerDisplay");
const countDisplays = {
    'player1': document.querySelector('#player1-pit .box'),
    'player2': document.querySelector('#player2-pit .box')
};

/*----- event listeners -----*/
document.addEventListener('DOMContentLoaded', init);


/*----- functions -----*/

function init() {
    resetGame();
    document.querySelector("#gameBoard").addEventListener('click', handleBoardClick);
    document.querySelector("#resetGame").addEventListener('click', resetGame);
}

function resetGame() {
    for (let i = 1; i <= 13; i++) {
        gameBoard[i] = 3;
    }
    gameBoard['score1'] = 0;
    gameBoard['score2'] = 0;
    currentPlayerIndex = 0;
    turnCounter = 0; // Reset turn counter
    unmovablePit = Math.floor(Math.random() * 11) + 2; // Randomly chooses between pits 2-12
    render();
    updateGameStatus();

}


function render() {
    playerDisplay.textContent = `${PLAYERS[currentPlayerIndex]}'s Turn`;

    pits.forEach(pit => {
        const index = parseInt(pit.getAttribute('data-value'));

        // Update the visual state of the pit to indicate if it's movable or unmovable
        if (index === unmovablePit) {
            pit.classList.add("unmovable");
            pit.classList.remove("movable");
        } else {
            pit.classList.add("movable");
            pit.classList.remove("unmovable");
        }

        // Clear the current visual representation of rocks
        const box = pit.querySelector('.box');
        box.innerHTML = '';

        // Add the visual representation of rocks based on the gameBoard state
        for (let i = 0; i < (gameBoard[index] || 0); i++) {
            box.appendChild(createRocks());
        }
    });

    // Ensure the score displays and pits are updated to reflect the current game state
    updateScoreDisplays();
    updateScorePits();
}




function handleBoardClick(event) {
    const pit = event.target.closest('.pit');
    if (!pit) return;

    const pitIndex = parseInt(pit.getAttribute('data-value'));
    if (gameBoard[pitIndex] < 2 || !isPitStartableForPlayer(pitIndex)) {
        console.log("You cannot move one rock by itself.");
        return;
    }
    moveRocks(pitIndex);
}


function moveRocks(startIndex) {
    let rocks = gameBoard[startIndex];
    gameBoard[startIndex] = 0;
    let currentIndex = startIndex;



    function distributeRocks() {
        if (rocks === 0) {


            currentPlayerIndex = (currentPlayerIndex + 1) % 2; // Switch turns
            checkWinCondition();
            render();
            return;
        }

        currentIndex = getNextPitIndex(currentIndex);
        gameBoard[currentIndex] = (gameBoard[currentIndex] || 0) + 1;
        rocks--;

        // Handle scoring when rocks land in the scoring pits
        if (currentIndex === 1) {
            gameBoard['score1'] += 1;
        } else if (currentIndex === 14) {
            gameBoard['score2'] += 1;
        }

        if (rocks > 0) {
            requestAnimationFrame(distributeRocks);
        } else {
            updateScoreDisplays();
            currentPlayerIndex = (currentPlayerIndex + 1) % 2; // Switch turns after distribution ends
            checkWinCondition();
            render();
        }
    }

    distributeRocks();
}



function isPitStartableForPlayer(pitIndex) {
    // Check if the pit is the unmovable pit
    if (pitIndex === unmovablePit) return false;

    return (currentPlayerIndex === 0 && pitIndex >= 2 && pitIndex <= 7) ||
        (currentPlayerIndex === 1 && pitIndex >= 8 && pitIndex <= 13);
}


function checkWinCondition() {

    // Using the current Game State check for winner

    let winner = determineWinner();
    if (winner !== null) { // If a winner has been determined or it's a tie
        alert(`${winner} wins! Final scores - Player 1: ${gameBoard['score1']}, Player 2: ${gameBoard['score2']}`);
        resetGame();
    }
}


function determineWinner() {
    let gameEnds = checkIfGameEnds();
    if (!gameEnds) return null; // Game does not end yet

    // Game ends, determine the winner based on scores
    if (gameBoard['score1'] > gameBoard['score2']) return 'Player 1';
    if (gameBoard['score2'] > gameBoard['score1']) return 'Player 2';
    return 'It\'s a tie!'; // Scores are equal
}


function checkIfGameEnds() {
    let player1CanMove = false, player2CanMove = false;
    for (let i = 2; i <= 13; i++) {
        if (gameBoard[i] > 0 && i !== unmovablePit) { // If pit has rocks and is not unmovable
            if (i <= 7 && gameBoard[i] > 1) player1CanMove = true;
            else if (i >= 8 && gameBoard[i] > 1) player2CanMove = true;
        }
    }


    return !player1CanMove || !player2CanMove;
}




function updateScoreDisplays() {
    document.getElementById('player1Score').textContent = `Score: ${gameBoard['score1']}`;
    document.getElementById('player2Score').textContent = `Score: ${gameBoard['score2']}`;
}


function updateGameStatus() {
    const statusElement = document.getElementById("gameStatus");
    if (unmovablePit) {
        statusElement.textContent = `Unmovable Pit: ${unmovablePit}`;
    } else {
        statusElement.textContent = "Unmovable Pit: None";
    }
}


function playDropSound() {
    SOUND_EFFECT.play();
}


// utility functions


function createRocks() {
    const rock = document.createElement('span');
    rock.className = "rocks";
    return rock;
}


function updateScorePits() {
    const score1Box = document.querySelector('#player1-pit .box');
    const score2Box = document.querySelector('#player2-pit .box');

    // Clear previous rocks
    score1Box.innerHTML = '';
    score2Box.innerHTML = '';

    // Add visual representation of rocks in score pits
    for (let i = 0; i < gameBoard['score1']; i++) {
        score1Box.appendChild(createRocks());
    }
    for (let i = 0; i < gameBoard['score2']; i++) {
        score2Box.appendChild(createRocks());
    }
}



function updateUnmovablePit() {
    let newUnmovablePit;
    do {
        newUnmovablePit = Math.floor(Math.random() * 11) + 2;
    } while (newUnmovablePit === unmovablePit);

    unmovablePit = newUnmovablePit;


    render();
    updateGameStatus(); // Update game status with the new unmovable pit

}


function getNextPitIndex(currentIndex) {
    return currentPlayerIndex === 0 ? PLAYER_1_MOVEMENT_MAP[currentIndex] : PLAYER_2_MOVEMENT_MAP[currentIndex];
}



function isOpponentScorePit(currentIndex) {
    if (currentPlayerIndex === 0 && currentIndex === 14) {
        return true;
    } else if (currentPlayerIndex === 1 && currentIndex === 1) {
        return true;
    }
    return false;
}


function updateScoreDisplays() {
    document.getElementById('player1Score').textContent = `Score: ${gameBoard['score1']}`;
    document.getElementById('player2Score').textContent = `Score: ${gameBoard['score2']}`;
}

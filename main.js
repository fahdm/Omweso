/*----- constants -----*/
const sound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-small-hit-in-a-game-2072.mp3");
const players = ["Player 1", "Player 2"];

/*------State VariabLe----- */

let gameBoard = {};
let count = { 'player1': 0, 'player2': 0 };
let currentPlayerIndex = 0;

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

function handleBoardClick(event) {
    const pit = event.target.closest('.pit');
    if (!pit) return;

    const pitIndex = parseInt(pit.getAttribute('data-value'));
    const rocksInPit = gameBoard[pitIndex];

    if (rocksInPit < 2) { // Check if there are 2 or more rocks
        console.log("You cannot move one rock by itself.");
        return; // Exit without making a move
    }

    if (isPitStartableForPlayer(pitIndex)) {
        moveRocks(pitIndex);
    }
}

function resetGame() {
    // Reset the game state for each pit
    for (let i = 1; i <= 13; i++) {
        gameBoard[i] = 3; // Assign 3 rocks to each pit
    }
    // Reset scores
    gameBoard['score1'] = 0;
    gameBoard['score2'] = 0;

    // Clear visual rocks from scoring pits
    document.querySelector('.score1 .box').innerHTML = '';
    document.querySelector('.score2 .box').innerHTML = '';

    // Reset current player index
    currentPlayerIndex = 0;
    
    // Re-render the game board
    render();
}

function render() {
    playerDisplay.textContent = `${players[currentPlayerIndex]}'s Turn`;
    pits.forEach(pit => {
        const index = parseInt(pit.getAttribute('data-value'));
        const box = pit.querySelector('.box');
        box.innerHTML = '';
        for (let i = 0; i < (gameBoard[index] || 0); i++) {
            box.appendChild(createRocks());
        }
    });
    // Update score displays
    document.getElementById('player1Score').textContent = `Score: ${gameBoard['score1']}`;
    document.getElementById('player2Score').textContent = `Score: ${gameBoard['score2']}`;
    
}

function createRocks() {
    const rock = document.createElement('span');
    rock.className = "rocks";
    return rock;
}

function moveRocks(startIndex) {
    let rocks = gameBoard[startIndex];
    gameBoard[startIndex] = 0; // Empty the selected pit immediately
    let currentIndex = startIndex;

    function distributeRocks() {
        if (rocks === 0) {
            if (gameBoard[currentIndex] > 1 && currentIndex !== 1 && currentIndex !== 14) {
                // If the current pit has more than one rock (excluding scoring pits), pick them up and continue
                rocks = gameBoard[currentIndex];
                gameBoard[currentIndex] = 0; // Clear the pit
                document.querySelector(`[data-value="${currentIndex}"] .box`).innerHTML = ''; // Clear the visual representation
            } else {
                currentPlayerIndex = (currentPlayerIndex + 1) % 2; // Switch turns
                checkWinCondition();
                render();
                return;
            }
        }
    

        // Determine next pit index based on the current player
    currentIndex = currentPlayerIndex === 0 ? getNextPitIndexPlayer1(currentIndex) : getNextPitIndexPlayer2(currentIndex);
    

        // Check if the current pit is the player's scoring pit and visually add a rock
        if (currentPlayerIndex === 0 && currentIndex === 1) {
            gameBoard['score1'] += 1;
            rocks--;
            document.querySelector('.score1 .box').appendChild(createRocks()); // Visually add a rock to score1
            playDropSound();
        } else if (currentPlayerIndex === 1 && currentIndex === 14) {
            gameBoard['score2'] += 1;
            rocks--;
            document.querySelector('.score2 .box').appendChild(createRocks()); // Visually add a rock to score2
            playDropSound();
        } else if (!isOpponentScorePit(currentIndex)) {
            gameBoard[currentIndex] += 1;
            rocks--;
            if(currentIndex > 1 && currentIndex < 14) { // Ensure we only visually add rocks to pits, not score pits here
                const pitBox = document.querySelector(`[data-value="${currentIndex}"] .box`);
                pitBox.appendChild(createRocks());
            }
            playDropSound();
        }
    
        if (rocks > 0) {
            requestAnimationFrame(distributeRocks);
        } else {
            currentPlayerIndex = (currentPlayerIndex + 1) % 2; // Switch turns after distribution ends
            checkWinCondition();
            render();
        }
    }
    
    distributeRocks();
}
// Player 1 and Two Counter Clockwise movement.

function getNextPitIndexPlayer1(currentIndex) {
    if (currentIndex >= 7 && currentIndex < 2) { // Move through Player 1's pits
        return currentIndex + 1;
    } else if (currentIndex === 1) { // From Player 1's last pit, jump to Player 2's first pit
        return 8;
    } else if (currentIndex >= 8 && currentIndex < 14) { // Move through Player 2's pits
        return currentIndex + 1;
    } else { // Loop to Player 1's score pit or the first of Player 1's pits after scoring
        return 1;
    }
}

function getNextPitIndexPlayer2(currentIndex) {
    if (currentIndex === 14) { // After scoring, jump to Player 1's last pit
        return 7;
    } else if (currentIndex > 8 && currentIndex <= 13) { // Move through Player 2's pits
        return currentIndex + 1;
    } else if (currentIndex === 8) { // After completing Player 2's side, jump to Player 1's side
        return 2;
    } else if (currentIndex > 1 && currentIndex <= 7) { // Skip through Player 1's pits directly to score
        return 14;
    } else { // This scenario accounts for when Player 2 starts at their scoring pit
        return 8; // Ensures the game continues from Player 2's first pit
    }
}


function isPitStartableForPlayer(pitIndex) {
    return (currentPlayerIndex === 0 && pitIndex >= 2 && pitIndex <= 7) ||
           (currentPlayerIndex === 1 && pitIndex >= 8 && pitIndex <= 13);
}

function isOpponentScorePit(currentIndex) {
    if (currentPlayerIndex === 0 && currentIndex === 14) {
        return true;
    } else if (currentPlayerIndex === 1 && currentIndex === 1) {
        return true;
    }
    return false;
}

function checkWinCondition() {
    const player1SideEmpty = [2, 3, 4, 5, 6, 7].every(i => gameBoard[i] === 0);
    const player2SideEmpty = [8, 9, 10, 11, 12, 13].every(i => gameBoard[i] === 0);

    if (player1SideEmpty || player2SideEmpty) {
        const winner = gameBoard['score1'] > gameBoard['score2'] ? 'Player 1' : 'Player 2';
        alert(`${winner} wins!`);
        resetGame(); // Resets the game for a new round
        }
        }
        
        function playDropSound() {
        sound.play();
        }

        

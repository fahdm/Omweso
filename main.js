/*----- constants -----*/
const sound = new Audio("https://assets.mixkit.co/active_storage/sfx/3005/3005-preview.mp3");
const players = ["Player 1", "Player 2"];

/*----- state variables -----*/
let currentPlayerIndex = 0;
let gameBoard = {};

/*----- cached elements  -----*/
const pits = document.querySelectorAll(".pit");
const playerDisplay = document.querySelector("#playerDisplay");



/*----- functions -----*/
function init() {
    // Initialize the game board with 6 pits per player, each starting with 4 balls
    for (let i = 0; i < pits.length; i++) {
        
        gameBoard[i + 1] = 4; // Each pit starts with 4 balls
    }

    attachPitListeners();
    render();
}

function render() {
    // Display current player
    playerTurn(currentPlayerIndex);

    // Update gameBoard state
    Object.keys(gameBoard).forEach(value => {
        const pit = document.querySelector(`.pit[data-value="${value}"] .box`);
        setUpPitDisplay(pit, gameBoard[value]);
    });
}

function setUpPitDisplay(pit, numOfRocks) {
    while (pit.firstChild) pit.removeChild(pit.firstChild);
    for (let i = 0; i < numOfRocks; i++) {
        pit.appendChild(createRocks());
    }
}

function createRocks() {
    const rocks = document.createElement('span');
    rocks.className = "rocks";
    return rocks;
}

function attachPitListeners() {
    // Listen for a Drop event
    // The Adjacent cell add one
}

function playerTurn(playerIndex) {
    playerDisplay.textContent = `${players[playerIndex]}'s Turn`;
}

// Initialize game on document load
document.addEventListener('DOMContentLoaded', init);

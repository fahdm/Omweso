# Omweso
An African Mancala Game Built Using HTML5 CSS and JavaScript.
🎲🇺🇬 This is an entertaining African game where players move pebbles on a 6 x 2 board. 
Each player controls one row, and the game continues until one row is entirely empty. 
The player with the most pebbles at the end of the game is declared the winner.

👑🏆 The winner is crowned king, symbolizing the strategic gameplay required for victory.

🤔💡 The game is not necessarily dependent on speed; haste may lead to loss. 
It is designed to stimulate thought, enhance math skills, and improve problem-solving abilities. 
For generations, it has been an integral part of Ugandan culture, with royals and kings often renowned as game masters. 
Winning against a king could even result in rewards like acres of land and wealth! Many game variations persist today.
The version you're about to play is commonly enjoyed by children in Uganda and across Africa.

🎮🕹️ Enjoy the game and embark on your own royal adventure! 👑🎉
# Rules

1. **Set Up:** Place 4 stones in each of the 12 small pits on the board. The big pits at the ends are empty.
2. **Your Turn:** Pick all stones from any 1 of your pits and drop one in each pit counterclockwise, including your big pit but not your opponent's.
3. **Keep Going:** If the last stone lands in a pit with stones, pick them all up and continue your turn.
4. **Extra Turn:** If your last stone lands in your big pit, you get another turn.
5. **Game Ends:** The game ends when one player's side of small pits is empty.
6. **Winning:** The player with the most stones in their big pit wins.

HOW TO PLAY

[https://youtu.be/-A-djjimCcM?si=8GNo5SA1QB_TqvGP](url)


# Pseudo Code

## Constants

- The game board size is fixed to 6x 2.
- Initial rock  count is 4 stones per pit.
- Default Player Names input.

Variables:

- Keep track of current player, game board state, and player names.

Cache Elements:

- Cache current state of game board
- Cache status of  collection bin
- Cache player input

Event Listeners:

- Listen for player actions .
- Drag  and Drop stones on the game board.

Functions:

- **InitializeGame()**: Calls initial render and resets the game. Set up the game board and player names.
- **Render()**: Renders the initial game state and displays what appears on the board.
- **SwitchPlayer()**: Toggles between players after each turn.
- **PlayerTurn()**: Handles player's turn.
- **CheckGameEnd()**: Checks if an entire row is empty; if so, the game ends.
- **Winner()**: Determines the winner, who is the player with the most pebbles in their collection bin.
- **Render()**: Updates the user interface to reflect changes in the game state.
- **Main Game Loop**: Starts the game loop and repeats player turns until the game ends.
- **handleDrag()**: Handles the drag action when the player picks up pebbles. Checks the draggable cell index, and the player drags all pebbles in that cell index.
- **handleDrop()**: Handles the drop action. If the drop zone is empty and not equal to the player's collection bin, places one pebble and ends the turn. If the pebble drop zone is equal to the player's collection bin, gets an extra turn. Otherwise, adds one pebble to the neighboring cell index and keeps looping until the drop zone is zero.

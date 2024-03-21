# Omweso Game 
Omweso is a dynamic, two-player strategy game inspired by a traditional Ugandan board game.🎲🇺🇬 
For generations, it has been an integral part of Ugandan culture, with royals and kings often renowned as game masters. The game simulates a competition between two players who move rocks across pits on a board, aiming to collect more rocks than their opponent. The game incorporates simple yet engaging mechanics, including strategic movement, randomized unmovable pits, and a playful, gamified interface designed to provide an enjoyable experience for players of all ages. 👑🏆

# Features
- **Dynamic Game Board:** A board consisting of two rows with a total of 14 pits (7 for each player) and 2 scoring pits.
- **Sound Effects:** Engaging sound effects that enhance the gaming experience with each move.
- **Player Turn Display:** Visual indication of the current player's turn.
- **Score Display:** Real-time score updates for both players.
- **Unmovable Pit:** Randomly selected pit that changes each game, adding a layer of unpredictability and strategy.
- **Reset Game Button:** Allows players to start a new game instantly.

## Technology Stack

- **HTML:** Structures the game's interface.
- **CSS:** Provides styling and animations for a visually appealing experience.
- **JavaScript:** Implements the game logic, event handling, and dynamic content updates.

## Setup

To run the project locally:

1. Clone or download the project repository.
2. Open the `index.html` file in a modern web browser.

## Game Rules

1. **Starting the Game:** The game begins with 3 rocks in each of the 12 smaller pits, with the scoring pits starting empty.
2. **Objective:** Score more rocks than your opponent by the end of the game.
3. **Turns:** Players take turns moving rocks from their pits, distributing them one by one into subsequent pits counterclockwise.
4. **Unmovable Pit:** One pit (excluding the scoring pits and the first pit) is randomly chosen as unmovable at the start, adding a strategic element.
5. **Legal Moves:**   A rock cannot move by it's self. Moves are initiated from your row.
6. **Scoring:** Rocks landing in a player's scoring pit (by exact count) increase their score.
7. **Winning:** The game ends when a player can't make a legal move. The one with the most rocks in their scoring pit wins, or it's a tie if both have equal numbers.

## Development
The development of the Omweso game is structured around a few core components that define its gameplay mechanics, visual and audio feedback, and player interactions. Here's a brief overview of the key elements involved in the game's development, focusing on sound effects, player arrays, movement maps, game state variables, and the event-driven architecture that ties it all together.

### Constants
##### Sound Effects
Implementation: Utilizes the Audio object in JavaScript to load and play sound effects. 
For example, a hit sound effect is triggered whenever a player makes a move.

##### Arrays 
An array was used to define the players

##### Objects
Movement Maps for Players: These are objects used to map each pit to its subsequent pit according to the game's movement rules for each player. Objects are chosen here because they easily represent key-value pairs, with each key (current pit) mapping directly to a value (next pit).

Game Board State (gameBoard): This object tracks the current state of each pit on the board, including the number of rocks in each pit and the scores for both players. Using an object allows for easy access and updates to each pit's state by referencing the pit's number (or key).

#### State Variables
Game State Variables: Variables such as gameBoard, currentPlayerIndex, and unmovablePit track the state of the game.

#### Cache Elements

* Pits
* Player Displays
* Count Displays

#### Event Listeners
Initial setup and game interactions are managed through event listeners, primarily focused on game board clicks and the reset game button.



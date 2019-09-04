import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import { GameState } from "./entities/index.js"
// import { drawSnake, drawFood, clearBoard } from "./visuals/index.js"
// import { setDeltaTime } from "./scripts/answers/index.js"

ReactDOM.render(<App />, document.getElementById('root'));

const canvas = document.getElementById("snakeBoard")
const context = canvas.getContext('2d');

/*
1. create a function that sets an interval for delta time
- scripts/deltaTime.js

2. create a function that logs a statement every time the interval completes
- scripts/logging.js

3. alter the clear board function (pretend that it is async), how would you draw the snake after the clearing of the board
- snake (entities/snake.js)
- drawing snake (visuals/index.js)
- clear board (visuals/index.js)

4. alter the drawing snake function, how would you move the snake
- moving of the snake is an instance method


5. create a function that the snake moving can take in to end the game if the snake head is no longer in an alive position (start by logging that the game has ended)

6. extend the end game to call the died method on snake, followed by clearing the board, followed by drawing the snake one final time (in its death state, followed by clearing the interval) [pretend once again that all of these are asynchronous]


7. create an event listener for keystrokes that can change the direction of the snake based on "w, s, a, d"


8. using the game state, create a function that checks if the food is eaten (with the position)

*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

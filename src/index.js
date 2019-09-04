import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { GameState } from "./entities/index.js"
import { drawSnake, drawFood, clearBoard } from "./visuals/index.js"
import { setDeltaTime } from "./scripts/answers/index.js"

ReactDOM.render(<App />, document.getElementById('root'));

const canvas = document.getElementById("snakeBoard")
const context = canvas.getContext('2d');

// drawSnakeSegment(context, "red", 50, 650)
// x and y should be between 0 and 650
// drawFood(context, 25, 675)
// x and y should be between 25 and 675


/*
1. create a function that sets an interval for delta time
2. create a function that logs a statement every time the interval completes
3. alter the clear board function (pretend that it is async), how would you draw the snake after the clearing of the board
4. alter the drawing snake function (pretend that it is async), how would you move the snake
5. create a function that the snake moving can take in to end the game if the snake head is no longer in an alive position (start by logging that the game has ended)
6. extend the end game to call the died method on snake, followed by clearing the board, followed by drawing the snake one final time (in its death state, followed by clearing the interval) [pretend once again that all of these are asynchronous]
7. create an event listener for keystrokes that can change the direction of the snake based on "w, s, a, d"
8. using the game state, create a function that checks if the food is eaten (with the position)
*/

const gameEnd = (context, int) => (gameState) => (snake) => {
  console.log("game has ended")
  gameState.endGame()
  snake.died()
  clearBoard(context)
  drawSnake(context, snake)
  clearInterval(int)
}

// const snake = generateNewSnake()
const gameState = GameState.newGame()

const interval = setDeltaTime(() => {
  const moveCb = (snake, food) => {
    clearBoard(context)
    drawSnake(context, snake)
    const foodPosition = food.centerPosition()
    drawFood(context, foodPosition)
  }
  gameState.nextMove(moveCb, gameEnd(context, interval))
}, 200)

const changeSnakeDirection = (key) => {
  if (key === "w" || key === "ArrowUp") {
    gameState.snake.changeDirection("up")
  } else if (key === "s" || key === "ArrowDown") {
    gameState.snake.changeDirection("down")
  } else if (key === "d" || key === "ArrowRight") {
    gameState.snake.changeDirection("right")
  } else if (key === "a" || key === "ArrowLeft") {
    gameState.snake.changeDirection("left")
  }
}

document.addEventListener('keydown', (e) => {
  setTimeout(() => {
    changeSnakeDirection(e.key)
  }, 200)
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

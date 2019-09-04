import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { GameState } from "./entities/index.js"
import { drawSnake, drawFood, clearBoard } from "./visuals/index.js"
import { executeWithWindowAnimationFrame } from "./scripts/answers/index.js"

ReactDOM.render(<App />, document.getElementById('root'));

const canvas = document.getElementById("snakeBoard")
const context = canvas.getContext('2d')

const gameEnd = (context, int) => (gameState) => (snake) => {
  console.log("game has ended")
  gameState.endGame()
  snake.died()
  clearBoard(context)
  drawSnake(context, snake)
  int()
}

const gameState = GameState.newGame()

const interval = executeWithWindowAnimationFrame(() => {
  const moveCb = (snake, food) => {
    clearBoard(context)
    drawSnake(context, snake)
    const foodPosition = food.centerPosition()
    drawFood(context, foodPosition)
  }
  gameState.nextMove(moveCb, gameEnd(context, interval))
})

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

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { GameState } from "./entities/index.js"
import { drawSnake, drawFood, clearBoard } from "./visuals/index.js"
import { executeWithWindowAnimationFrame } from "./scripts/answers/index.js"
import { keyDown$, ticker$, end$ } from "./scripts/answers/rx.js"

import { interval } from "rxjs"
import { pipe, map, throttle, ignoreElements, takeUntil } from "rxjs/operators"

ReactDOM.render(<App />, document.getElementById('root'));

const canvas = document.getElementById("snakeBoard")
const context = canvas.getContext('2d')

// const gameEnd = (context, int) => (gameState) => (snake) => {
//   console.log("game has ended")
//   gameState.endGame()
//   snake.died()
//   clearBoard(context)
//   drawSnake(context, snake)
//   int()
//   end$.subscribe()
// }

// rx version
const gameEnd = (context) => (gameState) => (snake) => {
  console.log("game has ended")
  gameState.endGame()
  snake.died()
  clearBoard(context)
  drawSnake(context, snake)
  end$.subscribe()
}

const gameState = GameState.newGame()

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

const moveCb = (snake, food) => {
  clearBoard(context)
  drawSnake(context, snake)
  const foodPosition = food.centerPosition()
  drawFood(context, foodPosition)
}

// const timeInterval = executeWithWindowAnimationFrame(() => {
//   gameState.nextMove(moveCb, gameEnd(context, timeInterval))
// })

ticker$
  .pipe(
    map(val => {
      gameState.nextMove(moveCb, gameEnd(context))
    },
    takeUntil(end$),
    ignoreElements())
  )
  .subscribe()

keyDown$
  .pipe(
    throttle(val => interval(200)),
    map(event => {
      changeSnakeDirection(event.key)
    },
    ignoreElements())
  )
  .subscribe()

// document.addEventListener('keydown', (e) => {
//   setTimeout(() => {
//     changeSnakeDirection(e.key)
//   }, 200)
// })

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

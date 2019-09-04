import { generateNewSnake } from "./snake.js"
import Food from "./food.js"

class GameState {
  constructor() {
    this.gameOver = false
    this.snake = generateNewSnake()
    this.food = Food.generate()
  }

  static newGame() {
    return new GameState()
  }

  nextMove(moveCb, endCb) {
    if (this.timeout) 
      return

    this.timeout = setTimeout(() => {
      this.snake.move(endCb(this))
      moveCb(this.snake, this.food)
      this.isFoodEaten()  
      this.timeout = null
    }, 700)  
  }

  isFoodEaten() {
    const snakeHeadPos = this.snake.segments[0].centerPosition()
    const foodPos = this.food.centerPosition()
    if (this.samePosition(snakeHeadPos, foodPos)) {
      this.snake.grow()
      this.food = Food.generate()
    }
  }

  samePosition(obj1, obj2) {
    return obj1.x === obj2.x && obj1.y === obj2.y
  }

  endGame() {
    this.gameOver = true
  }
}

export default GameState

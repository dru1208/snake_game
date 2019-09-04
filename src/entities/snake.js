import SnakeSegment from "./snakeSegment.js"

class Snake {
  constructor(segments) {
    this.segments = segments
    this.segments[0] = this.segments[0]
  }

  move() {
    const newSegments = this.segments.map((segment, index) => {
      const prevSegment = index === 0 ? this.segments[0] : this.segments[index - 1]
      const prevDirection = prevSegment.direction
      return segment.move(prevDirection)
    })
    this.segments = newSegments
  }

  died() {
    this.segments.forEach((segment) => {
      segment.color = "black"
    })
  }

  changeDirection(newDirection) {
    this.segments[0].changeDirection(newDirection);
  }

  grow() {
    const count = this.segments.length
    const lastSegment = this.segments[count - 1]
    const nextSegment = lastSegment.nextSegment()
    this.segments.push(nextSegment)
  }
}

const generateNewSnake = () => {
  const direction = "right"
  const snakeHead = new SnakeSegment(250, 250, direction, "red")
  const segments = [snakeHead]
  return new Snake(segments)
}

export { generateNewSnake }
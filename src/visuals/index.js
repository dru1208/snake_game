const SNAKE_SEGMENT_SIZE = 50;
const FOOD_STARTING_ANGLE = 0;
const FOOD_ENDING_ANGLE = Math.PI * 2;
const FOOD_RADIUS = 25

const drawFood = (context, foodPosition) => {
  const { x, y } = foodPosition
  context.beginPath()
  context.arc(x, y, FOOD_RADIUS, FOOD_STARTING_ANGLE, FOOD_ENDING_ANGLE)
  context.fillStyle = "green"
  context.fill();
  context.closePath()
}

const drawSnakeSegment = (context, color, xCoord, yCoord) => {
  context.beginPath()
  context.fillStyle = color;
  context.fillRect(xCoord, yCoord, SNAKE_SEGMENT_SIZE, SNAKE_SEGMENT_SIZE);
  context.closePath()
}

const drawSnake = (context, snake) => {
  const segments = snake.segments
  segments.forEach((segment) => {
    const { x, y, color } = segment
    drawSnakeSegment(context, color, x, y)
  })
}

const clearBoard = (context) => {
  context.beginPath();
  context.clearRect(0, 0, 700, 700);
  context.closePath();
}

export { drawSnakeSegment, drawFood, drawSnake, clearBoard }
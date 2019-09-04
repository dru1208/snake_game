const clearBoard = (context, cb) => {
  context.beginPath();
  context.clearRect(0, 0, 700, 700);
  context.closePath();
  cb()
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
  snake.move()
}
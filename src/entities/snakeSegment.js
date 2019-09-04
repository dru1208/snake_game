class SnakeSegment {
  constructor(x, y, direction, color) {
    this.x = x
    this.y = y
    this.direction = direction
    this.color = color
  }

  centerPosition() {
    return { x: this.x + 25, y: this.y + 25 }
  }

  changeDirection(newDirection) {
    if (this.validDirection(newDirection)) {
      this.direction = newDirection
    }
  }

  validDirection(newDirection) {
    if (this.direction === "up") {
      return newDirection !== "down"
    } else if (this.direction === "down") {
      return newDirection !== "up"
    } else if (this.direction === "right") {
      return newDirection !== "left"
    } else if (this.direction === "left") {
      return newDirection !== "right"
    }
  }

  move(previousSegmentDirection) {
    switch (this.direction) {
      case "left":
        return this.moveLeft(previousSegmentDirection);
      case "right":
        return this.moveRight(previousSegmentDirection);
      case "up":
        return this.moveUp(previousSegmentDirection);
      case "down":
        return this.moveDown(previousSegmentDirection);
      default:
        return this;
    }
  }

  moveLeft(newDirection) {
    return new SnakeSegment(this.x - 50, this.y, newDirection, this.color)
  }

  moveRight(newDirection) {
    return new SnakeSegment(this.x + 50, this.y, newDirection, this.color)
  }

  moveUp(newDirection) {
    return new SnakeSegment(this.x, this.y - 50, newDirection, this.color)
  }

  moveDown(newDirection) {
    return new SnakeSegment(this.x, this.y + 50, newDirection, this.color)
  }

  nextSegment() {
    switch (this.direction) {
      case "right":
        return this.moveLeft(this.direction);
      case "left":
        return this.moveRight(this.direction);
      case "down":
        return this.moveUp(this.direction);
      case "up":
        return this.moveDown(this.direction);
      default:
        return this;
    }
  }

  isAlive() {
    return this.inXBounds() && this.inYBounds()
  }

  inXBounds() {
    return this.inBounds(this.x)
  }

  inYBounds() {
    return this.inBounds(this.y)
  }

  inBounds(position) {
    return position >= 0 && position < 700
  }
}

export default SnakeSegment;
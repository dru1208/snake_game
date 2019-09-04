class Food {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.color = "green"
  }

  centerPosition() {
    return { x: this.x, y: this.y }
  }

  static generate() {
    const x = (50 * (Math.floor(Math.random() * 14))) + 25
    const y = (50 * (Math.floor(Math.random() * 14))) + 25
    return new Food(x, y)
  }
}

export default Food
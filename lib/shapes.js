// Make a constructor class for Shape to be inherited from circle, triangle & square.
class Shape {
  constructor() {
    this.color = "";
  }
  setColor(color) {
    this.color= (color);
  }
}

// Create classes for each shape that extends to Shape
// Possibly render code block can return the code to generate the svg image
class Circle extends Shape {
  render() {
    // return info for circle in index.js
    return `<circle cx="150" cy="120" r="70" fill="blue"/>`
  }
}

class Square extends Shape {
  render() {
    // return info for square in index.js
    return `<rect x="70" y="40" width="160" height="160" fill="red"/>`
  }
}

class Triangle extends Shape {
  render() {
    // return info for triangle from index.js
    return `<polygon points="150, 18 244, 182 56, 182" fill="orange"/>`
  }
}

// Need to Export classes (circle, triangle, square) to be used.
module.exports = { Circle, Triangle, Square };
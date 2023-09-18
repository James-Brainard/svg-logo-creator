// Make a constructor class for Shapes
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
    return `<circle cx="150" cy="120" r="70" fill="blue"/>`
    // return info in index.js
  }
}

class Square extends Shape {
  render() {
    return `<rect x="70" y="40" width="160" height="160" fill="red"/>`
    // return info for square in index.js
  }
}

class Triangle extends Shape {
  render() {
    return `<polygon points="150, 18 244, 182 56, 182" fill="orange"/>`
    // return info for triangle from index.js
  }
}

// Need to Export classes (circle, triangle, square)
module.exports = { Circle, Triangle, Square };
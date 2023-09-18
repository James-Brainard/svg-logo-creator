const { Circle, Triangle, Square } = require('./shapes');

// describe('Validate', () => {

//   it('should not accept password if they are fewer than 8 characters long.', () => {
//     // Arrange
//     // Act 
//     const result = validate.isPassword('abc');
//     // Assert
//     expect(result).toEqual(false);
//   });
// })
describe('circle', () => {
  describe('initialization', () => {
    it('Should render with 1-2 characters, text color and shape color', () => {

      const circle = new Circle();

      circle.setColor('blue');

      expect(circle.render()).toEqual('<circle cx="150" cy="120" r="70" fill="blue"/>')
    })
  })
})

describe('triangle', () => {
  describe('initialization', () => {
    it('Should render with 1-2 characters, text color and shape color', () => {

      const triangle = new Triangle();

      triangle.setColor('orange');

      expect(triangle.render()).toEqual('<polygon points="150, 18 244, 182 56, 182" fill="orange"/>')
    })
  })
})

describe('square', () => {
  describe('initialization', () => {
    it('Should render with 1-2 characters, text color and shape color', () => {

      const square = new Square();

      square.setColor('red')

      expect(square.render()).toEqual('<rect x="70" y="40" width="160" height="160" fill="red"/>')
    })
  })
})

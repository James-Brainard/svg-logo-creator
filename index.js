// GIVEN a command-line application that accepts user input
// WHEN I am prompted for text
// THEN I can enter up to three characters
// WHEN I am prompted for the text color
// THEN I can enter a color keyword (OR a hexadecimal number)
// WHEN I am prompted for a shape
// THEN I am presented with a list of shapes to choose from: circle, triangle, and square
// WHEN I am prompted for the shape's color
// THEN I can enter a color keyword (OR a hexadecimal number)
// WHEN I have entered input for all the prompts
// THEN an SVG file is created named `logo.svg`
// AND the output text "Generated logo.svg" is printed in the command line
// WHEN I open the `logo.svg` file in a browser
// THEN I am shown a 300x200 pixel image that matches the criteria I entered

const inquirer = require('inquirer');
const fs = require('fs');
const { Circle, Triangle, Square } = require('./lib/shapes');

// Defined promptQuestions to use inquirer prompt to display the questions and save them.
function promptQuestions() {
  inquirer.prompt([
    {
      message: "What text would you like in your logo? (Enter up to three characters)",
      name: 'text'
    },
    {
      message: "Choose text color (Choose hexadecimal number or enter color keyword)",
      name: 'textColor'
    },
    {
      type: "list",
      message: "What shape would you like for the logo?",
      choices: ["circle", new inquirer.Separator(), "triangle", new inquirer.Separator(), "square", new inquirer.Separator()],
      name: 'shape'
    },
    {
      message: "What color would you like your shape? (Choose hexadecimal number or enter color keyword)",
      name: 'shapeColor'
    },
  ])
    // Checking if the text is between 1-3 char. If so, run writeFileFunc with the "filename" and the user answers.
    .then((answers) => {
      if (answers.text.length > 3 || answers.text.length < 1) {
        console.error("You must enter 1-3 characters");
        // Will initiate promptUser to restart the prompt process
        promptQuestions();
      } else {
        writeFileFunc("Logo.svg", answers)
      }
    });
}


// writeFileFunc will take in the user answers and begin generating the code needed to create the svg logo.
function writeFileFunc(fileName, answers) {
  // File starts with an empty "" svgGen variable
  let svgGen = "";
  // set width and height of logo
  svgGen = '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
  svgGen += "<g>";
  svgGen += `${answers.shape}`;
  // Conditional check - checking what shape the user chose. Once defined after the check it will add the appropriate string of code along with shape color. 
  let shapeAnswer;
  if (answers.shape === "square") {
    shapeAnswer = new Square();
    svgGen += `<rect x="70" y="40" width="160" height="160" fill="${answers.shapeColor}"/>`;
  }
  else if (answers.shape === 'circle') {
    shapeAnswer = new Circle();
    svgGen += `<circle cx="150" cy="120" r="70" fill="${answers.shapeColor}"/>`;
  }
  else {
    shapeAnswer = new Triangle();
    svgGen += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeColor}"/>`;
  }
  // After shape has been defined in the code string, we will input the text & text color from the user.
  svgGen += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
  svgGen += "</g>";
  svgGen += "</svg>";
  // fs.writeFile() which will take in the completed svgGen string for the logo or print error if an error occurs.
  fs.writeFile('Logo.svg', svgGen, (err) => {
    err ? console.error(err) : console.log("Successfully generated Logo.svg file");
  })
}

// promptQuestions() will kick off the process of prompting the user to begin generating his or her logo!
promptQuestions();
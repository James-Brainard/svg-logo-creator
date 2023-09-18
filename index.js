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


// Tips: Object destructuring is needed at some point.

// Include packages needed for application
// const inquirer = require('inquirer') each file needs to require another in which is communicates or interacts with etc.

const inquirer = require('inquirer');
const fs = require('fs');
const { Circle, Triangle, Square } = require('./lib/shapes');

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
    // Need to build if statement for text prompt 3 or less characters to generate logo
    .then((answers) => {
      if (answers.text.length > 3 && answers.text.length < 1) {
        console.log("You must enter 1-3 characters");
        // Will initiate promptUser to restart the prompt process
        promptQuestions();
      } else {
        writeFileFunc("Logo.svg", answers)
      }
    });
}

// build a writeToFile callback function calling fswriteFile 
//fs.writefile(`logo.svg` aka file name, call a function with a param possibly, then an err (error) )
// Define svg string with all Gens needed. 
// Based on the user answers writeFileFunc will begin generating the svg string beginning with <svg> and continue to add onto it with the process below. Once we initiate the closing svg tag, fs writefile will input this into Logo.svg to generate user's logo.
function writeFileFunc(fileName, answers) {
  // File starts with empty "" svgGen variable
  let svgGen = "";
  // set width and height of logo
  svgGen = '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
  svgGen += "<g>";
  // user input for shape
  svgGen += `${answers.shape}`;
  // Conditional check - users input from choices, adds polygon props if necessary & shape color to the svg Gen to complete the svg string to define the shape and shape properties.
  let shapeAnswer;
  // if else if else statement for shapes
  // define shapeAnswer with new shape add additional data to svg Gen with += 
  if (answers.shape === "square") {
    shapeAnswer = new Square();
    svgGen += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeColor}"/>`;
  }
  else if (answers.shape === 'circle') {
    shapeAnswer = new Circle();
    svgGen += `<circle cx="160" cy="160" r="80" fill="${answers.shapeColor}"/>`;
  }
  else {
    shapeAnswer = new Triangle();
    svgGen += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeColor}"/>`;
  }
  svgGen += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
  svgGen += "</g>"; 
  svgGen += "</svg>";
  // Now write fs.writeFile() which will take in the completed svgGen, print error if an error occurs, else success!
  fs.writeFile('Logo.svg', svgGen, (err) => {
    err ? console.error(err) : console.log("Successfully generated Logo.svg file");
  })
}

// promptUser to kick off inquirer prompts when app is run. npm run test
promptQuestions();
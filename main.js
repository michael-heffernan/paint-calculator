const prompt = require("prompt-sync")();

const start = () => {
  console.log("Welcome to the paint calculator.");
  roomCalc();
};

// Get room area
const roomCalc = () => {
  console.log("How many walls are there in the room?");
  let numOfWalls = prompt(">");
  const walls = [];
  console.log(numOfWalls);
  for (let i = 0; i < numOfWalls; i++) {
    console.log("\n\t\t\t---------- Wall " + (i + 1) + " ----------");
    walls.push(wallCalc());
    console.log("Current walls: " + walls);
  }
  console.log("Total area: " + arraySum(walls));
  return walls;
};

// Get wall area
const wallCalc = () => {
  console.log("What is the height of the wall in cm?");
  let height = prompt(">");

  console.log("What is the width of the wall in cm?");
  let width = prompt(">");

  let area = width * height;
  let obstructedArea = 0;
  console.log(
    "Are there any obstructions or areas of the wall that do not need painting? (y/n)"
  );
  let obstructios = validateYorN();
  if (obstructios.toLowerCase() == "y") {
    obstructedArea = obstructionCalc();
  }
  let areaToPaint = area - obstructedArea;
  console.log("area to paint: " + areaToPaint);
  return areaToPaint;
};

// Get obstruction area
const obstructionCalc = () => {
  let moreObstructions = false;
  let obstructionsAreaTotal = 0;

  do {
    console.log("What is the width of the obstruction?");
    let width = prompt(">");

    console.log("What is the height of the obstruction?");
    let height = prompt(">");

    let obstructionArea = width * height;

    console.log("Are there any more obstructions? (y/n)");
    let moreObstructionsIn = validateYorN();

    moreObstructions = moreObstructionsIn != "y" ? false : true;
    obstructionsAreaTotal += obstructionArea;
  } while (moreObstructions == true);

  console.log("Total obstruction area: " + obstructionsAreaTotal);
  return obstructionsAreaTotal;
};

// Validate user input is y or n
const validateYorN = () => {
  let input = "a";
  do {
    input = prompt(">").toLowerCase();
    console.log(input);
    if (input != "y" && input != "n") {
      console.log(
        input + " Input not recognised please insert 'y' for yes or 'n' for no"
      );
    }
  } while (input != "y" && input != "n");

  return input;
};

const arraySum = (array) => {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
};

start();

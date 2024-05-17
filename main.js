const prompt = require("prompt-sync")();

const start = () => {
  console.log("Welcome to the paint calculator.");
  paintCalc();
};

const paintCalc = () => {
  let paintNeeded = arraySum(roomCalc());

  console.log("\nWould you like to include a 10% wastage buffer? (y/n)");
  let wastageBuffer = inputYorN();
  paintNeeded = wastageBuffer ? paintNeeded * 1.1 : paintNeeded;
  paintNeededLitre = Math.round(paintNeeded * 100) / 100;
  console.log("\nPaint needed: " + paintNeededLitre + "L");

  console.log("\n\t----------Cans needed----------");
  const cans = canCalc(paintNeeded);
  printTable(cans);
};

// Calculate most efficient combination of cans
const canCalc = (paintQuant) => {
  let cans = [0, 0, 0];
  let remainder = paintQuant / 1000;
  while (remainder != 0) {
    if (remainder >= 10) {
      let bigCans = Math.floor(remainder / 10);
      cans[0] = bigCans;
      remainder -= bigCans * 10;
    } else if (remainder >= 5) {
      let medCans = Math.floor(remainder / 5);
      cans[1] = medCans;
      remainder -= medCans * 5;
    } else if (remainder >= 2.5) {
      let smallCans = Math.floor(remainder / 2.5);
      cans[2] = smallCans;
      remainder -= smallCans * 2.5;
    } else {
      cans[2] += 1;
      remainder = 0;
    }
  }
  return cans;
};

// Get room area
const roomCalc = () => {
  console.log("How many walls are there in the room?");
  let numOfWalls = inputNumber();
  const walls = [];
  for (let i = 0; i < numOfWalls; i++) {
    console.log("\n\t\t\t---------- Wall " + (i + 1) + " ----------");
    walls.push(wallCalc());
  }
  return walls;
};

// Get wall area
const wallCalc = () => {
  console.log("What is the height of the wall in cm?");
  let height = inputNumber();

  console.log("What is the width of the wall in cm?");
  let width = inputNumber();

  let area = width * height;
  let obstructedArea = 0;
  console.log(
    "Are there any obstructions or areas of the wall that do not need painting? (y/n)"
  );
  let obstructions = inputYorN();
  if (obstructions == "y") {
    obstructedArea = obstructionCalc(area);
  }
  let areaToPaint = area - obstructedArea;
  return areaToPaint;
};

// Get obstruction area
const obstructionCalc = (area) => {
  let moreObstructions = false;
  let obstructionsAreaTotal = 0;

  do {
    console.log("What is the width of the obstruction?");
    let width = inputNumber();

    console.log("What is the height of the obstruction?");
    let height = inputNumber();

    let obstructionArea = width * height;

    console.log("Are there any more obstructions? (y/n)");
    let moreObstructionsIn = inputYorN();

    moreObstructions = moreObstructionsIn != "y" ? false : true;
    obstructionsAreaTotal += obstructionArea;
  } while (moreObstructions == true);

  console.log("Total obstruction area: " + obstructionsAreaTotal);
  return obstructionsAreaTotal;
};

// Validate user input is y or n
const inputYorN = () => {
  let valid = false;
  do {
    input = prompt(">").toLowerCase();
    if (input != "y" && input != "n") {
      console.log(
        input + " is not valid. Please insert 'y' for yes or 'n' for no"
      );
    } else {
      valid = true;
    }
  } while (valid == false);

  return input;
};

// Validate user input is a number
const inputNumber = () => {
  let valid = false;
  do {
    input = prompt(">").toLowerCase();

    if (isNaN(input)) {
      console.log(input + " is not valid. Please insert a number");
    } else if (input == "" || input.substr(0, 1) == " ") {
      console.log("No input detected. Please enter a valid number");
    } else {
      valid = true;
    }
  } while (valid == false);
  return input;
};

// Calculate sum of array
const arraySum = (array) => {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
};

const paintTypes = {
  GoodHome: {
    prices: [
      { size: 5, price: 22 },
      { size: 2.5, price: 16 },
    ],
  },
  Dulux: {
    prices: [
      { size: 10, price: 24 },
      { size: 5, price: 18 },
      { size: 2.5, price: 15 },
    ],
  },
};

const printTable = (cans) => {
  const header = "Can size\t\tQty\t\tCost";
  let total = 0;

  console.log(header);
  for (let i = 0; i < cans.length; i++) {
    switch (i) {
      case 0:
        cost = cans[i] * paintTypes.Dulux.prices[i].price;
        if (cost != 0) {
          console.log("10L\t\t\t" + cans[i] + "\t\t£" + cost);
        }
        total += cost;
        break;
      case 1:
        cost = cans[i] * paintTypes.Dulux.prices[i].price;
        if (cost != 0) {
          console.log("5L\t\t\t" + cans[i] + "\t\t£" + cost);
        }
        total += cost;
        break;
      case 2:
        cost = cans[i] * paintTypes.Dulux.prices[i].price;
        if (cost != 0) {
          console.log("2.5L\t\t\t" + cans[i] + "\t\t£" + cost);
        }
        total += cost;
        break;
    }
  }
  console.log("\t\t\t\tTotal:\t£" + total);
};

start();

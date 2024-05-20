const prompt = require("prompt-sync")();

const main = () => {
  console.log("Welcome to the paint calculator.");
  paintCalc();
};

// Calculate paint needed
const paintCalc = () => {
  let areaToPaint = arraySum(roomCalc());

  // Add optional 10% wastage buffer
  console.log("\nWould you like to include a 10% wastage buffer? (y/n)");
  let wastageBuffer = inputYorN();
  paintNeeded = wastageBuffer ? areaToPaint * 1.1 : areaToPaint;
  paintNeededLitre = Math.round((paintNeeded / 1000) * 100) / 100; // Convert to litres

  // Get desired paint type
  console.log("What type of paint would you like?");
  const paintType = menuInput((options = ["GoodHome", "Dulux", "Leyland"]));

  // Print final results
  console.log("\nTotal area to paint: " + areaToPaint / 100 + " square meters");
  console.log("10% wastage buffer? " + wastageBuffer.toUpperCase());
  console.log("Paint needed: " + paintNeededLitre + "L");
  printTable((cans = canCalc(paintNeededLitre)), (type = paintType));
};

// Display results
const printTable = (cans, type = "Dulux") => {
  let total = 0;
  let canPrices;

  // Find correct can price list
  if (type == "GoodHome") {
    canPrices = paintTypes.GoodHome.prices;
  } else if (type == "Dulux") {
    canPrices = paintTypes.Dulux.prices;
  } else if (type == "Leyland") {
    canPrices = paintTypes.Leyland.prices;
  }
  // Print results in a table
  console.log("\n\t----------Cans needed----------");
  console.log("Can size\t\tQty\t\tCost");
  for (let i = 0; i < cans.length; i++) {
    switch (i) {
      case 0:
        cost = cans[i] * canPrices[i];
        if (cost != 0) {
          console.log("10L\t\t\t" + cans[i] + "\t\t£" + cost);
        }
        total += cost;
        break;
      case 1:
        cost = cans[i] * canPrices[i];
        if (cost != 0) {
          console.log("5L\t\t\t" + cans[i] + "\t\t£" + cost);
        }
        total += cost;
        break;
      case 2:
        cost = cans[i] * canPrices[i];
        if (cost != 0) {
          console.log("2.5L\t\t\t" + cans[i] + "\t\t£" + cost);
        }
        total += cost;
        break;
    }
  }
  console.log("\t\t\t\tTotal:\t£" + total);
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
  // Get wall measurements from user
  let area = areaCalc("wall");

  // Check if there are obstructions
  let obstructedArea = 0;
  console.log(
    "Are there any obstructions or areas of the wall that do not need painting? (y/n)"
  );
  let obstructions = inputYorN();

  // If yes, get obstructions from user
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
    // Get obstruction measurements
    let obstructionArea = areaCalc("obstruction");

    // Check obstruction is not larger than wall
    if (obstructionArea >= area) {
      console.log(
        "Invalid input. obstruction must be smaller than the wall.\n"
      );
      moreObstructions = true;
    } else {
      obstructionsAreaTotal += obstructionArea;
      if (obstructionsAreaTotal >= area) {
        console.log(
          "Error: Total obstruced area must be smaller than the wall.\nReseting Obstructions for this wall."
        );
        obstructionsAreaTotal = 0;
      } else {
        // Check if therea are more obstructions to add
        console.log("Are there any more obstructions? (y/n)");
        moreObstructionsIn = inputYorN();
        moreObstructions = moreObstructionsIn != "y" ? false : true;
      }
    }
  } while (moreObstructions == true);
  return obstructionsAreaTotal;
};

// Calculate most efficient combination of can sizes
const canCalc = (paintQuant) => {
  let cans = [0, 0, 0];
  let remainder = paintQuant;
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

// Get height and width input from user and calculate an area
const areaCalc = (item) => {
  console.log("What is the width of the " + item + " in cm?");
  let width = inputNumber();
  console.log("What is the height of the " + item + " in cm?");
  let height = inputNumber();
  area = width * height;
  return area;
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
      // Input is not a number
      console.log(input + " is not valid. Please insert a number");
    } else if (input == "" || input.substr(0, 1) == " ") {
      // Input is blank
      console.log("No input detected. Please enter a valid number");
    } else {
      valid = true;
    }
  } while (valid == false);
  return input;
};

// Validate menu input
const menuInput = (options = []) => {
  let valid = false;

  // Display options
  for (let i = 0; i < options.length; i++) {
    console.log("[" + (i + 1) + "] " + options[i]);
  }
  do {
    let input = prompt(">");

    // Check input is valid number with a corresponding option
    if (input >= 1 && input <= options.length) {
      input -= 1;
      valid = true;
      result = options[input];
    } else {
      console.log(
        "Invalid input. Please enter a number between 1 and " + options.length
      );
    }
  } while (valid == false);
  return result;
};

// Calculate sum of array
const arraySum = (array) => {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
};

// Object containing paint types and their prices
// "prices" represents cans of 10L, 5L, 2.5L respectively
const paintTypes = {
  GoodHome: {
    prices: [30, 22, 16],
  },
  Dulux: {
    prices: [24, 18, 15],
  },
  Leyland: {
    prices: [16, 11, 8],
  },
};

main();

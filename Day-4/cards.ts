import fs from "node:fs";

import readline from "node:readline";

function getScoreOfCard(line: string): number {
  const winnerAndChoicesStr = line.split(": ")[1];
  const winnerAndChoices = winnerAndChoicesStr.split("| ");

  const winnerNumbersStr = winnerAndChoices[0];
  const winnerNumbers = winnerNumbersStr.split(" ");

  const choiceNumbersStr = winnerAndChoices[1];
  const choiceNumbers = choiceNumbersStr.split(" ");

  const winnerSet = new Set();
  winnerNumbers.forEach((num) => {
    if (num !== "") {
      winnerSet.add(Number(num));
    }
  });

  let value = 0;
  choiceNumbers.forEach((num) => {
    if (winnerSet.has(Number(num))) {
      if (value === 0) {
        value = 1;
      } else {
        value = value * 2;
      }
    }
  });
  return value;
}

async function processLineByLine() {
  const fileStream = fs.createReadStream("./Day-4/input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let runningTotal = 0;
  for await (const line of rl) {
    const calibraionNum = getScoreOfCard(line);
    runningTotal += calibraionNum;
  }
  console.log("total:", runningTotal);
}

await processLineByLine();

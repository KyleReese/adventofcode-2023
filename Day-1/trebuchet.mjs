import fs from "node:fs";

import readline from "node:readline";

const wordToDigitMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

function getCalibraionNumFromLine(line) {
  const digits = [
    ...line.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g),
  ].map((match) => match[1]);
  let firstDigit = digits[0];
  //Check if this is a word
  if (firstDigit.length > 1) {
    firstDigit = wordToDigitMap[firstDigit];
  }
  let lastDigit = digits[digits.length - 1];
  //Check if this is a word
  if (lastDigit.length > 1) {
    lastDigit = wordToDigitMap[lastDigit];
  }
  return Number(firstDigit + lastDigit);
}

async function processLineByLine() {
  const fileStream = fs.createReadStream("./Day-1/trebuchet-input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let runningTotal = 0;
  for await (const line of rl) {
    const calibraionNum = getCalibraionNumFromLine(line);
    runningTotal += calibraionNum;
  }
  console.log("total:", runningTotal);
}

await processLineByLine();

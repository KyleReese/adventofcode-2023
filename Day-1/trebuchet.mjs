import fs from "node:fs";

import readline from "node:readline";

function getCalibraionNumFromLine(line) {
  const digits = [...line.matchAll(/\d/g)];
  const firstDigit = digits[0][0];
  const lastDigit = digits[digits.length - 1][0];
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

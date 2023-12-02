import fs from "node:fs";

import readline from "node:readline";

function getGameId(line: string): number {
  const game = line.split(":")[0];
  const id = game.split(" ")[1];
  return Number(id);
}

function isHandPossible(hand: string): boolean {
  const totalRedCubes = 12;
  const totalGreenCubes = 13;
  const totalBlueCubes = 14;

  const cubes = hand.split(", ");
  let isPossible = true;
  cubes.every((cube) => {
    const split = cube.split(" ");
    const num = Number(split[0]);
    const color = split[1];
    if (color === "red" && num > totalRedCubes) {
      isPossible = false;
      return false;
    } else if (color === "green" && num > totalGreenCubes) {
      isPossible = false;
      return false;
    } else if (color === "blue" && num > totalBlueCubes) {
      isPossible = false;
      return false;
    }
    return true;
  });
  return isPossible;
}

//@return id of game or 0 if not possible
function isGamePossible(line: string): number {
  const allHandsStr = line.split(": ")[1];
  const allHands = allHandsStr.split("; ");
  let isPossible = true;
  allHands.forEach((hand) => {
    if (!isHandPossible(hand)) {
      isPossible = false;
    }
  });
  if (isPossible) {
    return getGameId(line);
  }
  return 0;
}

async function processLineByLine() {
  const fileStream = fs.createReadStream("./Day-2/input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let runningTotal = 0;
  for await (const line of rl) {
    const gameId = isGamePossible(line);
    runningTotal += gameId;
  }
  console.log("total:", runningTotal);
}

await processLineByLine();

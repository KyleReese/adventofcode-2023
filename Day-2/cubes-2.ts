import fs from "node:fs";

import readline from "node:readline";

type cubeCount = { red: number; green: number; blue: number };

function getCubeCountsFromHand(hand: string): cubeCount {
  const cubeCounts: cubeCount = { red: 0, green: 0, blue: 0 };

  const cubes = hand.split(", ");
  cubes.forEach((cube) => {
    const split = cube.split(" ");
    const num = Number(split[0]);
    const color = split[1];
    cubeCounts[color] = num;
  });
  return cubeCounts;
}

//@return the "power" of the set of cubes
function isGamePossible(line: string): number {
  const allHandsStr = line.split(": ")[1];
  const allHands = allHandsStr.split("; ");
  const totalMaxCubeCounts: cubeCount = { red: 0, green: 0, blue: 0 };
  allHands.forEach((hand) => {
    const handCount = getCubeCountsFromHand(hand);
    if (handCount.red > totalMaxCubeCounts.red) {
      totalMaxCubeCounts.red = handCount.red;
    }
    if (handCount.green > totalMaxCubeCounts.green) {
      totalMaxCubeCounts.green = handCount.green;
    }
    if (handCount.blue > totalMaxCubeCounts.blue) {
      totalMaxCubeCounts.blue = handCount.blue;
    }
  });

  return (
    totalMaxCubeCounts.red * totalMaxCubeCounts.blue * totalMaxCubeCounts.green
  );
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

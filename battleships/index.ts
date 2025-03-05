import * as readline from "node:readline/promises";
import { convertIndex, convertPoint, type Point } from "./point";
import { moorShip } from "./ships";

type Game = {
  size: Point;
  players: [string, string];
  fleets: [Array<Set<number>>, Array<Set<number>>];
  torpedoes: [Set<number>, Set<number>];
  player: () => [hunter: number, prey: number];
  toIndex: (point: Point) => number;
  toPoint: (index: number) => Point;
  start: () => void;
  fire: (target: Point) => void;
};

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const widthQuestion = {
  question: "How widt is the board (min 4)?",
  parse(answer: string) {
    return Number(answer);
  },
  validate(width: number) {
    console.log("You entered:", width);

    return width > 3;
  },
};

function setupGame(): Game {
  const width = 4;
  // const width = Number(
  //   await reader.question("How wide is the board (min 4)? ")
  // );

  const height = 4;
  // const height = Number(
  //   await reader.question("How deep is the board (min 4)? ")
  // );

  const size: Point = [width, height];

  const moor = moorShip(size);

  // const player1 = await reader.question("Enter first player's name: ");
  const player1 = "andy";
  const fleet1: Array<Set<number>> = [];
  if (
    moor("carrier", [0, 0], "h", fleet1) &&
    moor("destroyer", [0, 1], "v", fleet1) &&
    moor("destroyer", [1, 1], "v", fleet1) &&
    moor("gunship", [2, 1], "h", fleet1) &&
    moor("gunship", [3, 1], "h", fleet1) &&
    moor("gunship", [2, 2], "h", fleet1) &&
    moor("gunship", [3, 2], "h", fleet1)
  ) {
    console.log("fleet1 moored successfully");
  } else {
    console.log("problem with fleet1");
  }

  // const player2 = await reader.question("Enter second player's name: ");
  const player2 = "bert";
  const fleet2: Array<Set<number>> = [];
  if (
    moor("carrier", [0, 3], "h", fleet2) &&
    moor("destroyer", [0, 1], "h", fleet2) &&
    moor("destroyer", [1, 2], "h", fleet2) &&
    moor("gunship", [0, 0], "h", fleet2) &&
    moor("gunship", [1, 0], "v", fleet2) &&
    moor("gunship", [2, 0], "h", fleet2) &&
    moor("gunship", [3, 0], "v", fleet2)
  ) {
    console.log("fleet2 moored successfully");
  } else {
    console.log("problem with fleet2");
  }

  return {
    size,
    players: [player1, player2],
    fleets: [fleet1, fleet2],
    torpedoes: [new Set<number>(), new Set<number>()],
    toIndex: convertPoint(size),
    toPoint: convertIndex(size),
    player() {
      return this.torpedoes[0].size === this.torpedoes[1].size
        ? [0, 1]
        : [1, 0];
    },
    start() {
      const player = this.player();

      // ask player to enter their torpedo's target
    },
    fire(target: Point) {
      const [hunter, prey] = this.player();

      const index = this.toIndex(target);

      if (this.torpedoes[hunter].has(index)) {
        console.log(
          `You have already torpedoed square [${target}], try again...`
        );
        return "";
      }

      this.torpedoes[hunter].add(index);

      for (const [ship, moorings] of this.fleets[prey].entries()) {
        if (moorings.has(index)) {
          if (moorings.isSubsetOf(new Set(this.torpedoes[hunter]))) {
            console.log(`You sank my ship`);
          }
          return "x";
        }
      }

      return "o";
    },
  };
}

const game = setupGame();

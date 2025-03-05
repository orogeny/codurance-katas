import { convertPoint, type Point } from "./point";

type Ship = { type: string; quantity: number; length: number };

const SHIPS: Ship[] = [
  { type: "carrier", quantity: 1, length: 4 },
  { type: "destroyer", quantity: 2, length: 3 },
  { type: "gunship", quantity: 4, length: 1 },
];

type Orientation = "h" | "v";

function moorShip(size: Point, fleet: Array<Set<number>>) {
  const [width, height] = size;

  const toIndex = convertPoint(size);

  return function (type: string, location: Point, orientation: Orientation) {
    const [x, y] = location;

    const ship = SHIPS.find((s) => s.type === type);

    if (ship === undefined) return false;

    const points = new Set<number>();

    for (let i = 0; i < ship.length; i++) {
      if (orientation === "h") {
        points.add(toIndex([x + i, y]));
      } else {
        points.add(toIndex([x, y + i]));
      }
    }

    for (const moorings of fleet) {
      if (!points.isDisjointFrom(moorings)) return false;
    }

    fleet.push(points);

    return true;
  };
}

export { moorShip, SHIPS };
export type { Orientation, Ship };

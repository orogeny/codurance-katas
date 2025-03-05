import { describe, expect, test } from "bun:test";
import { moorShip } from "./ships";

describe("moor ships", () => {
  test("horizontally", () => {
    const fleet: Array<Set<number>> = [];

    const moor = moorShip([4, 4]);

    expect(moor("carrier", [0, 0], "h", fleet)).toBeTrue();
    expect(fleet).toHaveLength(1);
    expect(fleet).toEqual([new Set([0, 1, 2, 3])]);
  });

  test("vertically", () => {
    const fleet: Array<Set<number>> = [];

    const moor = moorShip([4, 4]);

    expect(moor("destroyer", [2, 1], "v", fleet)).toBeTrue();
    expect(fleet).toHaveLength(1);
    expect(fleet).toEqual([new Set([6, 10, 14])]);
  });

  test("horizontal clash", () => {
    const fleet: Array<Set<number>> = [];

    const moor = moorShip([4, 4]);

    moor("carrier", [0, 0], "h", fleet);
    expect(moor("gunship", [3, 0], "h", fleet)).toBeFalse();
  });

  test("vertical clash", () => {
    const fleet: Array<Set<number>> = [];

    const moor = moorShip([4, 4]);

    moor("destroyer", [3, 1], "v", fleet);
    expect(moor("gunship", [3, 2], "v", fleet)).toBeFalse();
  });
});

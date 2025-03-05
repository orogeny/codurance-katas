import { describe, expect, test } from "bun:test";
import { moorShip } from "./ships";

describe("moor ships", () => {
  test("horizontally", () => {
    const fleet: Array<Set<number>> = [];

    const moor = moorShip([4, 4], fleet);

    expect(moor("carrier", [0, 0], "h")).toBeTrue();
    expect(fleet).toHaveLength(1);
    expect(fleet).toEqual([new Set([0, 1, 2, 3])]);
  });

  test("vertically", () => {
    const fleet: Array<Set<number>> = [];

    const moor = moorShip([4, 4], fleet);

    expect(moor("destroyer", [2, 1], "v")).toBeTrue();
    expect(fleet).toHaveLength(1);
    expect(fleet).toEqual([new Set([6, 10, 14])]);
  });

  test("horizontal clash", () => {
    const fleet: Array<Set<number>> = [];

    const moor = moorShip([4, 4], fleet);

    moor("carrier", [0, 0], "h");
    expect(moor("gunship", [3, 0], "h")).toBeFalse();
  });

  test("vertical clash", () => {
    const fleet: Array<Set<number>> = [];

    const moor = moorShip([4, 4], fleet);

    moor("destroyer", [3, 1], "v");
    expect(moor("gunship", [3, 2], "v")).toBeFalse();
  });
});

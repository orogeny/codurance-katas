import { describe, expect, test } from "bun:test";
import { convertIndex, convertPoint, type Point } from "./point";

describe("point tuple", () => {
  test("create point", () => {
    const point = [3, 4] as Point;

    expect(point[0]).toBe(3);
    expect(point[1]).toBe(4);
  });

  test("toIndex", () => {
    const toIndex = convertPoint([4, 5]);

    expect(toIndex([0, 0])).toBe(0);
    expect(toIndex([0, 1])).toBe(4);
    expect(toIndex([3, 4])).toBe(19);
  });

  test("toPoint", () => {
    const toPoint = convertIndex([4, 5]);

    expect(toPoint(0)).toEqual([0, 0]);
    expect(toPoint(4)).toEqual([0, 1]);
    expect(toPoint(19)).toEqual([3, 4]);
  });

  // TODO: Index/Point conversion outside board dimensions
});

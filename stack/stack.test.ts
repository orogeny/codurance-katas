import { describe, expect, test } from "bun:test";
import { Stack } from "./stack";

describe("stack", () => {
  test("empty stack should have size 0", () => {
    const stack = new Stack();

    expect(stack.size).toBe(0);
  });

  test("new stack should have 1 element", () => {
    const stack = new Stack(1);

    expect(stack.size).toBe(1);
  });

  test("push first value should have size 1", () => {
    const stack = new Stack();

    expect(stack.push(42).size).toBe(1);
  });

  test("empty stack should return empty array", () => {
    const stack = new Stack();

    expect(stack.toArray()).toEqual([]);
  });

  test("initialised stack should return single initial value in array", () => {
    const stack = new Stack(42);

    expect(stack.toArray()).toEqual([42]);
  });

  test("array should return initial and pushed value", () => {
    const stack = new Stack(42);

    expect(stack.push(84).toArray()).toEqual([84, 42]);
  });

  test("array should return two pushed values", () => {
    const stack = new Stack();

    expect(stack.push(42).push(84).toArray()).toEqual([84, 42]);
  });

  test("push to pre-seeded stack should have size 2", () => {
    const stack = new Stack(42);

    const newStack = stack.push(84);

    expect(stack.push(84).size).toBe(2);
  });
});

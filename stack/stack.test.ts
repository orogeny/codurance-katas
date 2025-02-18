import { describe, expect, test } from "bun:test";
import { Stack } from "./stack";

describe("stack - size", () => {
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

  test("push to pre-seeded stack should have size 2", () => {
    const stack = new Stack(42);

    const newStack = stack.push(84);

    expect(stack.push(84).size).toBe(2);
  });
});

describe("stack - toArray()", () => {
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
});

describe("stack - peek()", () => {
  test("peeking empty stack should return null", () => {
    const stack = new Stack();

    expect(stack.peek()).toBeNull();
  });

  test("peeking initialized stack should return initial value", () => {
    const stack = new Stack(42);

    expect(stack.peek()).toBe(42);
  });

  test("peeking stack should return top value", () => {
    const stack = new Stack();

    expect(stack.push(42).push(84).push(168).peek()).toBe(168);
  });
});

describe("stack - pop()", () => {
  test("popping empty stack returns null and empty stack", () => {
    const emptyStack = new Stack<boolean>();

    const [value, stack] = emptyStack.pop();

    expect(value).toBeNull();
    expect(stack.isEmpty).toBe(true);
  });

  test("popping initialized stack returns initial value and empty stack", () => {
    const stack = new Stack(42);

    const [value, previous] = stack.pop();

    expect(value).toBe(42);
    expect(previous.isEmpty).toBe(true);
  });

  test("popping stack returns previous stack", () => {
    const stack = new Stack().push(42).push(84);

    const [value, previous] = stack.pop();

    expect(value).toBe(84);
    expect(previous.size).toBe(1);
    expect(previous.peek()).toBe(42);
  });
});

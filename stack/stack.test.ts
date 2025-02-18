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
});

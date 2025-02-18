import { describe, expect, test } from "bun:test";
import { Stack } from "./stack";

describe("stack", () => {
  test("empty stack should have size 0", () => {
    const stack = new Stack();

    expect(stack.size).toBe(0);
  });
});

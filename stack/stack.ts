class Stack<T> {
  private _top: T | null;
  private _previous: Stack<T> | null = null;

  constructor(value?: T) {
    this._top = value ?? null;
  }

  get size(): number {
    let size = 0;

    let current: Stack<T> | null = this;

    while (current !== null && current._top !== null) {
      size += 1;
      current = current._previous;
    }

    return size;
  }

  push(value: T) {
    const newStack = new Stack(value);

    if (this._top !== null) {
      newStack._previous = this;
    }

    return newStack;
  }

  toArray() {
    const result: T[] = [];

    let current: Stack<T> | null = this;

    while (current !== null && current._top !== null) {
      result.push(current._top);
      current = current._previous;
    }

    return result;
  }
}

export { Stack };

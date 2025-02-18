class Stack<T> {
  private _top: T | null;
  private _previous: Stack<T> | null = null;

  constructor(value?: T) {
    this._top = value ?? null;
  }

  get size(): number {
    if (this._top === null) return 0;
    if (this._previous === null) return 1;
    return this._previous.size + 1;
  }
}

export { Stack };

type Point = [x: number, y: number];

function convertIndex(size: Point) {
  const [width, height] = size;

  return function (index: number): Point {
    const x = index % width;
    const y = Math.floor(index / width);

    return [x, y];
  };
}

function convertPoint(size: Point) {
  const [width, height] = size;

  return function (point: Point) {
    const [x, y] = point;

    return x + width * y;
  };
}

export type { Point };
export { convertIndex, convertPoint };

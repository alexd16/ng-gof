export default class Point {
  private _neighbourhood: Point[] = null;
  constructor(public x: number, public y: number) {}

  static fromString(string): Point {
    const pointRegex = /P\((.+), (.+)\)/;
    const match = pointRegex.exec(string);
    const x = parseInt(match[1], 10);
    const y = parseInt(match[2], 10);
    return new Point(x, y);
  }

  toString() {
    return `P(${this.x}, ${this.y})`;
  }

  equalTo(otherPoint: Point): boolean {
    return this.x === otherPoint.x && this.y === otherPoint.y;
  }

  translateX(offset: number) {
    return new Point(this.x + offset, this.y);
  }

  translateY(offset: number) {
    return new Point(this.x, this.y + offset);
  }

  translate(offsetX: number, offsetY: number) {
    return this.translateX(offsetX).translateY(offsetY);
  }

  neighbourhood(): Point[] {
    if (this._neighbourhood) {
      return this._neighbourhood;
    }
    const { x, y } = this;
    this._neighbourhood = [
      new Point(x - 1, y - 1),
      new Point(x, y - 1),
      new Point(x + 1, y - 1),
      new Point(x - 1, y),
      new Point(x + 1, y),
      new Point(x - 1, y + 1),
      new Point(x, y + 1),
      new Point(x + 1, y + 1),
    ];
    return this._neighbourhood;
  }
}

export const makePoint = (x: number, y: number) => {
  return new Point(x, y);
};

export default class Point {
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

  neighbourhood(): Point[] {
    const neighbourhood = [];
    for (let x = this.x - 1; x <= this.x + 1; x++) {
      for (let y = this.y - 1; y <= this.y + 1; y++) {
        const p = new Point(x, y);
        if (!this.equalTo(p)) {
          neighbourhood.push(p);
        }
      }
    }
    return neighbourhood;
  }
}

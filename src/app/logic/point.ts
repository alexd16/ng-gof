export default class Point {
  constructor(public x: number, public y: number) {}

  toString() {
    return `P(${this.x}, ${this.y})`;
  }

  equalTo(otherPoint: Point): boolean {
    return this.x === otherPoint.x && this.y === otherPoint.y;
  }
}

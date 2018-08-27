import Point from "../point";

export default class PointSet {
  points: Map<string, Point> = new Map();
  constructor() {}

  size() {
    return this.points.size;
  }

  hasPoint(point: Point): boolean {
    return !!this.points.get(point.toString());
  }

  add(point: Point) {
    this.points.set(point.toString(), point);
  }

  toArray() {
    const array = [];
    this.points.forEach(point => {
      array.push(point);
    });
    return array;
  }

  forEach(cb) {
    this.points.forEach(point => {
      cb(point);
    });
  }
}

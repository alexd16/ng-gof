import Point from "../point";

export default class PointSet {
  points: Map<string, Point> = new Map();
  topLeft: Point = new Point(Infinity, Infinity);
  bottomRight: Point = new Point(-Infinity, -Infinity);
  constructor() {}

  size() {
    return this.points.size;
  }

  hasPoint(point: Point): boolean {
    return !!this.points.get(point.toString());
  }

  add(point: Point) {
    this.updateBoundingBox(point);
    this.points.set(point.toString(), point);
  }

  boundingBox(padding = 0): { topLeft: Point; bottomRight: Point } {
    const topLeft = new Point(
      this.topLeft.x - padding,
      this.topLeft.y - padding
    );
    const bottomRight = new Point(
      this.bottomRight.x + padding,
      this.bottomRight.y + padding
    );

    return { topLeft, bottomRight };
  }

  numberOfNeighboursFor(point: Point) {
    const neighbourhood = this.neighbourhoodOf(point);
    return neighbourhood.size();
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

  private neighbourhoodOf(point: Point): PointSet {
    const neighbourhood: PointSet = new PointSet();
    for (let x = point.x - 1; x <= point.x + 1; x++) {
      for (let y = point.y - 1; y <= point.y + 1; y++) {
        const p = new Point(x, y);
        if (!point.equalTo(p) && this.hasPoint(p)) {
          neighbourhood.add(p);
        }
      }
    }
    return neighbourhood;
  }

  private updateBoundingBox(point: Point) {
    if (point.x < this.topLeft.x) {
      this.topLeft = new Point(point.x, this.topLeft.y);
    }

    if (point.y < this.topLeft.y) {
      this.topLeft = new Point(this.topLeft.x, point.y);
    }

    if (point.x > this.bottomRight.x) {
      this.bottomRight = new Point(point.x, this.bottomRight.y);
    }

    if (point.y > this.bottomRight.y) {
      this.bottomRight = new Point(this.bottomRight.x, point.y);
    }
  }
}

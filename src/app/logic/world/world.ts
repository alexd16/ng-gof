import PointSet from "../point-collection/point-collection";
import Point from "../point";

export default class World {
  constructor(
    private cells: PointSet,
    private neighbourhoodCount: Map<string, number>
  ) {}

  static buildFrom(cells: Array<{ x: number; y: number }>) {
    const points = new PointSet();
    const neighbourhoodCount = new Map<string, number>();
    cells.forEach(pointObj => {
      const newPoint = new Point(pointObj.x, pointObj.y);
      points.add(newPoint);
      World.addNeighbourhoodFor(neighbourhoodCount, newPoint);
    });
    return new World(points, neighbourhoodCount);
  }

  static addNeighbourhoodFor(
    neighbourhoodCount: Map<string, number>,
    p: Point
  ) {
    p.neighbourhood().forEach(neighbour => {
      const currentCount = neighbourhoodCount.get(neighbour.toString()) || 0;
      neighbourhoodCount.set(neighbour.toString(), currentCount + 1);
    });
  }

  aliveCells() {
    return this.cells.toArray().map(cell => {
      return { x: cell.x, y: cell.y };
    });
  }

  isCellAliveAt(cell: Point): boolean {
    return !!this.cells.hasPoint(cell);
  }

  nextGeneration() {
    const newCellSet = new PointSet();
    const newNeighbourhoodCount = new Map<string, number>();
    this.neighbourhoodCount.forEach((numberOfNeighbours, pointString) => {
      const point = Point.fromString(pointString);
      const isAlive = this.cells.hasPoint(point);
      if (isAlive) {
        if (numberOfNeighbours === 2 || numberOfNeighbours === 3) {
          newCellSet.add(point);
          World.addNeighbourhoodFor(newNeighbourhoodCount, point);
        }
      } else {
        if (numberOfNeighbours === 3) {
          newCellSet.add(point);
          World.addNeighbourhoodFor(newNeighbourhoodCount, point);
        }
      }
    });
    return new World(newCellSet, newNeighbourhoodCount);
  }

  board(): Map<Point, boolean> {
    const { topLeft, bottomRight } = this.cells.boundingBox(1);
    const board = new Map<Point, boolean>();
    for (let y = topLeft.y; y <= bottomRight.y; y++) {
      for (let x = topLeft.x; x <= bottomRight.x; x++) {
        const p = new Point(x, y);
        board.set(p, this.cells.hasPoint(p));
      }
    }
    return board;
  }
}

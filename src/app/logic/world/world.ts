import PointSet from "../point-collection/point-collection";
import Point from "../point";

export default class World {
  constructor(
    private cells: PointSet = new PointSet(),
    private neighbourhoodCount: Map<string, number> = new Map<string, number>()
  ) {}

  static buildFrom(cells: Array<{ x: number; y: number }>) {
    const newWorld = new World();
    cells.forEach(pointObj => {
      const newPoint = new Point(pointObj.x, pointObj.y);
      newWorld.addCell(newPoint);
    });
    return newWorld;
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
    const newWorld = new World();
    this.neighbourhoodCount.forEach((numberOfNeighbours, pointString) => {
      const point = Point.fromString(pointString);
      const isAlive = this.cells.hasPoint(point);
      if (isAlive) {
        if (numberOfNeighbours === 2 || numberOfNeighbours === 3) {
          newWorld.addCell(point);
        }
      } else {
        if (numberOfNeighbours === 3) {
          newWorld.addCell(point);
        }
      }
    });
    return newWorld;
  }

  addCell(p: Point) {
    this.cells.add(p);
    p.neighbourhood().forEach(neighbour => {
      const currentCount =
        this.neighbourhoodCount.get(neighbour.toString()) || 0;
      this.neighbourhoodCount.set(neighbour.toString(), currentCount + 1);
    });
  }
}

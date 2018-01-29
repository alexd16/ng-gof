import PointSet from "../point-collection/point-collection";
import Point from "../point";

export default class World {
  constructor(private cells: PointSet) {}

  static buildFrom(cells: Array<{ x: number; y: number }>) {
    const points = new PointSet();
    cells.forEach(pointObj => {
      points.add(new Point(pointObj.x, pointObj.y));
    });
    return new World(points);
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
    const board = this.board();
    board.forEach((isAlive, cell) => {
      const numberOfNeighbours: number = this.cells.numberOfNeighboursFor(cell);
      if (isAlive) {
        if (numberOfNeighbours === 2 || numberOfNeighbours === 3) {
          newCellSet.add(cell);
        }
      } else {
        if (numberOfNeighbours === 3) {
          newCellSet.add(cell);
        }
      }
    });
    return new World(newCellSet);
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

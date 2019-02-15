import { QuadTree, makeEmptyQuadTree } from "../quad-tree/quad-tree";
import Point, { makePoint } from "../point";

export class LifeWorld {
  board: QuadTree<boolean>;

  constructor() {
    this.board = makeEmptyQuadTree<boolean>(3, false);
  }

  static buildFrom(cells: Array<{ x: number; y: number }>) {
    const world = new LifeWorld();
    cells.forEach(({ x, y }) => {
      world.addCell(makePoint(x, y));
    });
    return world;
  }

  aliveCells() {}

  isCellAliveAt(cell: Point): boolean {
    return this.board.get(cell);
  }

  nextGeneration(): LifeWorld {
    return this;
  }

  addCell(p: Point): void {
    this.board = this.board.set(p, true);
  }

  removeCell(p: Point): void {
    this.board = this.board.set(p, false);
  }
}

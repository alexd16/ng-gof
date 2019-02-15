import Point from "../point";
import { hash, is, Set, Map } from "immutable";

export class QuadTreeLeaf<T> {
  depth = 0;

  constructor(public value: T) {}

  set(point: Point, value: T): QuadTree<T> {
    return createLeaf(value);
  }

  get(point: Point): T {
    return this.value;
  }

  toString() {
    return this.value;
  }

  equals(other: QuadTree<T>) {
    if (other.depth > 0) {
      return false;
    } else {
      return is(this.value, (other as QuadTreeLeaf<T>).value);
    }
  }

  hashCode(): number {
    return hash(this.value);
  }
}

export class QuadTreeNode<T> {
  depth: number;

  constructor(
    public tr: QuadTree<T>,
    public br: QuadTree<T>,
    public bl: QuadTree<T>,
    public tl: QuadTree<T>
  ) {
    this.depth = tr.depth + 1;
  }

  equals(other: QuadTree<T>) {
    if (this.depth !== other.depth) {
      return false;
    } else {
      const otherNode = other as QuadTreeNode<T>;
      return (
        this.tr === otherNode.tr &&
        this.br === otherNode.br &&
        this.bl === otherNode.bl &&
        this.tl === otherNode.tl
      );
    }
  }

  hashCode() {
    return (
      hash(this.tr) +
      11 * hash(this.br) +
      101 * hash(this.bl) +
      1007 * hash(this.tl)
    );
  }

  set(point: Point, value: T): QuadTree<T> {
    if (!this.fits(point)) {
      return this.expand().set(point, value);
    }

    const offset = 2 ** (this.depth - 2);
    if (point.x > 0) {
      if (point.y > 0) {
        const newBr = this.br.set(
          point.translateX(-offset).translateY(-offset),
          value
        );
        return createNode(this.tr, newBr, this.bl, this.tl);
      } else {
        const newTr = this.tr.set(
          point.translateX(-offset).translateY(offset),
          value
        );
        return createNode(newTr, this.br, this.bl, this.tl);
      }
    } else {
      if (point.y > 0) {
        const newBl = this.bl.set(
          point.translateX(offset).translateY(-offset),
          value
        );
        return createNode(this.tr, this.br, newBl, this.tl);
      } else {
        const newTl = this.tl.set(
          point.translateX(offset).translateY(offset),
          value
        );
        return createNode(this.tr, this.br, this.bl, newTl);
      }
    }
  }

  get(point: Point): T {
    const offset = 2 ** (this.depth - 2);
    if (point.x > 0) {
      if (point.y > 0) {
        return this.br.get(point.translateX(-offset).translateY(-offset));
      } else {
        return this.tr.get(point.translateX(-offset).translateY(offset));
      }
    } else {
      if (point.y > 0) {
        return this.bl.get(point.translateX(offset).translateY(-offset));
      } else {
        return this.tl.get(point.translateX(offset).translateY(offset));
      }
    }
  }

  fits(p: Point) {
    const halfWidth = 2 ** this.depth / 2;
    return (
      p.x <= halfWidth &&
      p.x > -halfWidth &&
      p.y <= halfWidth &&
      p.y > -halfWidth
    );
  }

  expand(defaultValue: T = null): QuadTreeNode<T> {
    const border = makeEmptyQuadTree(this.depth - 1, defaultValue);
    const newTr = createNode(border, border, this.tr, border);
    const newBr = createNode(border, border, border, this.br);
    const newBl = createNode(this.bl, border, border, border);
    const newTl = createNode(border, this.tl, border, border);
    return createNode(newTr, newBr, newBl, newTl);
  }
}

export type QuadTree<T> = QuadTreeNode<T> | QuadTreeLeaf<T>;

export let cache = null;
const memoize = <T>(fun: (...args) => T): any => {
  cache = Map<T>({});
  return (...args: any[]): T => {
    const value = fun(...args);
    const savedValue = cache.get(value);
    if (savedValue) {
      return savedValue;
    }
    console.log("New Ref Saved");
    cache = cache.set(value, value);
    return value;
  };
};

export const createNode = memoize(
  <T>(
    tr: QuadTree<T>,
    br: QuadTree<T>,
    bl: QuadTree<T>,
    tl: QuadTree<T>
  ): QuadTreeNode<T> => {
    return new QuadTreeNode(tr, br, bl, tl);
  }
);

export const createLeaf: <T>(value: T) => QuadTree<T> = memoize(
  <T>(value: T): QuadTreeLeaf<T> => {
    return new QuadTreeLeaf(value);
  }
);

export const makeEmptyQuadTree = <T>(
  depth: number,
  defaultValue: T = null
): QuadTree<T> => {
  if (depth === 0) {
    return createLeaf(defaultValue);
  } else {
    const emptyTree = makeEmptyQuadTree(depth - 1, defaultValue);
    return createNode(emptyTree, emptyTree, emptyTree, emptyTree);
  }
};

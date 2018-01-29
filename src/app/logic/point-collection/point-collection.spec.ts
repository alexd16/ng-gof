import PointSet from "./point-collection";
import Point from "../point";

describe("PointCollection", () => {
  let pointSet: PointSet;
  describe("given an empty collection", () => {
    beforeEach(() => (pointSet = new PointSet()));

    describe("#size", () => {
      it("returns 0 on an empty collection", () => {
        expect(pointSet.size()).toEqual(0);
      });
    });

    describe("#add", () => {
      it("adds one element if called once", () => {
        pointSet.add(new Point(1, 1));
        expect(pointSet.size()).toEqual(1);
      });

      it("adds two elements if called twice with differente points", () => {
        pointSet.add(new Point(1, 1));
        pointSet.add(new Point(1, 2));
        expect(pointSet.size()).toEqual(2);
      });

      it("adds 1 elements if called twice with the same points", () => {
        pointSet.add(new Point(1, 1));
        pointSet.add(new Point(1, 1));
        expect(pointSet.size()).toEqual(1);
      });
    });
    describe("#numberOfNeighboursFor", () => {
      it("returns 0 for an empty collection", () => {
        const p = new Point(1, 1);
        expect(pointSet.numberOfNeighboursFor(p)).toEqual(0);
      });

      describe("given I add a point", () => {
        beforeEach(() => pointSet.add(new Point(1, 1)));

        it("returns 1 for every point in the neighbourhood", () => {
          const neighbourhoodPoints = [
            new Point(0, 0),
            new Point(1, 0),
            new Point(2, 0),
            new Point(0, 1),
            new Point(0, 1),
            new Point(2, 1),
            new Point(0, 2),
            new Point(1, 2),
            new Point(2, 2),
          ];
          const allOnNeighbourhood = neighbourhoodPoints.every(
            neighbourhoodPoint => {
              return pointSet.numberOfNeighboursFor(neighbourhoodPoint) === 1;
            }
          );
          expect(allOnNeighbourhood).toBeTruthy();
        });

        it("returns 0 for a point outside of the neighbourhood", () => {
          const outsidePoint = new Point(3, 3);
          expect(pointSet.numberOfNeighboursFor(outsidePoint)).toEqual(0);
        });
      });
    });
    describe("#boundingBox", () => {
      it("returns an exclusive bounding box on a empty collection", () => {
        const expectedTopLeft = new Point(Infinity, Infinity);
        const expectedBottomRight = new Point(-Infinity, -Infinity);
        const { topLeft, bottomRight } = pointSet.boundingBox();
        expect(topLeft).toEqual(expectedTopLeft);
        expect(bottomRight).toEqual(expectedBottomRight);
      });

      describe("given a collection with a point at: ", () => {
        beforeEach(() => pointSet.add(new Point(5, 5)));

        it("returns top left at (5,5) and bottomRight at (5,5)", () => {
          const expectedTopLeft = new Point(5, 5);
          const expectedBottomRight = new Point(5, 5);
          const { topLeft, bottomRight } = pointSet.boundingBox();
          expect(topLeft).toEqual(expectedTopLeft);
          expect(bottomRight).toEqual(expectedBottomRight);
        });
      });

      describe("given a collection with points at: ", () => {
        beforeEach(() => {
          pointSet.add(new Point(1, 5));
          pointSet.add(new Point(5, 1));
        });

        it("returns top left at (1, 1) and bottomRight at (5, 5)", () => {
          const expectedTopLeft = new Point(1, 1);
          const expectedBottomRight = new Point(5, 5);
          const { topLeft, bottomRight } = pointSet.boundingBox();
          expect(topLeft).toEqual(expectedTopLeft);
          expect(bottomRight).toEqual(expectedBottomRight);
        });

        it("with padding of 2 returns top left at (-1, -1) and bottomRight at (7, 7)", () => {
          const expectedTopLeft = new Point(-1, -1);
          const expectedBottomRight = new Point(7, 7);
          const { topLeft, bottomRight } = pointSet.boundingBox(2);
          expect(topLeft).toEqual(expectedTopLeft);
          expect(bottomRight).toEqual(expectedBottomRight);
        });
      });
    });
    describe("#points", () => {
      it("returns an empty array on an empty collection", () => {
        expect(pointSet.toArray()).toEqual([]);
      });

      describe("given a collection with points at", () => {
        const p1 = new Point(1, 1);
        const p2 = new Point(2, 2);
        const p3 = new Point(69, 1000);
        beforeEach(() => {
          pointSet.add(p1);
          pointSet.add(p2);
          pointSet.add(p3);
        });

        it("returns an array with the same added points", () => {
          expect(pointSet.toArray()).toEqual([p1, p2, p3]);
        });

        it("returns an array without duplicates", () => {
          pointSet.add(new Point(1, 1));
          expect(pointSet.toArray()).toEqual([p1, p2, p3]);
        });
      });
    });
  });
});

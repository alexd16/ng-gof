import World from "./world";

describe("World", () => {
  describe("#aliveCells", () => {
    describe("given a world without alive cells", () => {
      it("returns an empty array", () => {
        const world = World.buildFrom([]);
        expect(world.aliveCells()).toEqual([]);
      });
    });

    describe("given a world with one cell", () => {
      let cell;
      beforeEach(() => {
        cell = { x: 0, y: 0 };
      });

      it("returns an array with the cell", () => {
        const world = World.buildFrom([cell]);
        expect(world.aliveCells()).toEqual([cell]);
      });
    });
  });
  describe("#nextGeneration", () => {
    describe("given a world without alive cells", () => {
      it("returns a new world", () => {
        const world = World.buildFrom([]);
        const newWorld = world.nextGeneration();
        expect(newWorld).toBeDefined();
        expect(newWorld instanceof World).toBeTruthy();
        expect(newWorld).not.toBe(world);
      });
    });

    describe("given a world with one cell", () => {
      it("returns a new world without alive cells", () => {
        const world = World.buildFrom([{ x: 1, y: 1 }]);
        const newWorld = world.nextGeneration();
        expect(newWorld.aliveCells()).toEqual([]);
      });
    });

    describe("given a world with two cells", () => {
      it("returns a new world without alive cells", () => {
        const world = World.buildFrom([{ x: 1, y: 1 }, { x: 2, y: 1 }]);
        const newWorld = world.nextGeneration();
        expect(newWorld.aliveCells()).toEqual([]);
      });
    });

    describe("given a world with alive cells at (1,1), (2,2) and (3, 3)", () => {
      it("returns a new world with an alive cell at (2,2) ", () => {
        const world = World.buildFrom([
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 3 },
        ]);
        const newWorld = world.nextGeneration();
        expect(newWorld.aliveCells()).toEqual([{ x: 2, y: 2 }]);
      });
    });

    describe("given a world with alive cells at (1,1), (1,2), (2,1) and (2,2)", () => {
      it("returns a new world with the same alive cells", () => {
        const cells = [
          { x: 1, y: 1 },
          { x: 2, y: 1 },
          { x: 1, y: 2 },
          { x: 2, y: 2 },
        ];
        const world = World.buildFrom(cells);
        const newWorld = world.nextGeneration();
        expect(newWorld.aliveCells()).toEqual(cells);
      });
    });

    describe("given a world with the following cells", () => {
      const cells = [
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 3, y: 1 },
        { x: 0, y: 2 },
        { x: 2, y: 2 },
      ];

      it("returns a new world with all the cells except (1, 1)", () => {
        const world = World.buildFrom(cells);
        const newWorld = world.nextGeneration();
        const newCells = [
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 0, y: 1 },
          { x: 3, y: 1 },
          { x: 0, y: 2 },
          { x: 2, y: 2 },
        ];
        expect(newWorld.aliveCells()).toEqual(newCells);
      });
    });

    describe("given a world with the following cells", () => {
      const cells = [
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 2 },
        { x: 2, y: 2 },
      ];

      it("returns a new worlds with the following cells", () => {
        const newCells = [
          { x: 1, y: 0 },
          { x: 0, y: 1 },
          { x: 2, y: 1 },
          { x: 1, y: 2 },
        ];
        const world = World.buildFrom(cells);
        const newWorld = world.nextGeneration();
        expect(newWorld.aliveCells()).toEqual(newCells);
      });
    });
  });
});

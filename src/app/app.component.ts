import { Component } from "@angular/core";

import World from "./logic/world/world";
import Point from "./logic/point";

@Component({
  selector: "gof-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  rows = 120;
  columns = 120;
  timer = 1;
  title = "app";
  world = World.buildFrom([]);
  intervalHandler = null;
  started = false;
  generation = 0;

  aliveCells = [];

  start() {
    if (this.started) {
      return;
    }
    this.started = true;
    this.intervalHandler = setInterval(() => {
      this.world = this.world.nextGeneration();
      this.generation++;
    }, this.timer);
  }

  stop() {
    if (this.intervalHandler) {
      this.started = false;
      clearInterval(this.intervalHandler);
    }
  }

  resetWorld() {
    this.world = World.buildFrom([]);
  }

  columnsArray() {
    return new Array(this.rows);
  }

  rowsArray() {
    return new Array(this.columns);
  }

  isCellAliveAt(x, y) {
    const point = new Point(x, y);
    return this.world.isCellAliveAt(point);
  }

  toggleCell(event) {
    const { x, y } = event;
    if (this.started) {
      return;
    }
    let aliveCells = this.world.aliveCells();
    const cell = { x, y };
    const existingCell = aliveCells.find(c => c.x === cell.x && c.y === cell.y);
    if (existingCell) {
      const cellIndex = aliveCells.indexOf(existingCell);
      aliveCells.splice(cellIndex, 1);
    } else {
      aliveCells = aliveCells.concat([cell]);
    }
    console.log(aliveCells);
    this.world = World.buildFrom(aliveCells);
  }
}

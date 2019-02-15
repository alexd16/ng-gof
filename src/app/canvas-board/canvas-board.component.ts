import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import World from "../logic/world/world";

@Component({
  selector: "gof-canvas-board",
  templateUrl: "./canvas-board.component.html",
  styleUrls: ["./canvas-board.component.css"],
})
export class CanvasBoardComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild("board")
  canvasRef: ElementRef;

  canvasElement: HTMLCanvasElement = null;
  drawingContext: CanvasRenderingContext2D = null;

  gridWidth = 0;
  gridHeight = 0;
  padding = 0;

  squareSize = 8;

  @Input()
  world: World;
  @Input()
  rows: number;
  @Input()
  columns: number;

  @Output()
  cellClick = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.canvasElement = this.canvasRef.nativeElement;
    this.drawingContext = this.canvasElement.getContext("2d");

    this.gridWidth = this.columns * this.squareSize;
    this.gridHeight = this.rows * this.squareSize;
  }

  get canvasWidth() {
    return this.gridWidth + 2 * this.padding + 1;
  }

  get canvasHeight() {
    return this.gridHeight + 2 * this.padding + 1;
  }

  onClick(event) {
    const rect = this.canvasElement.getBoundingClientRect();
    const canvasX = event.clientX - rect.left;
    const canvasY = event.clientY - rect.top;
    const x = Math.round((canvasX - this.padding) / this.squareSize);
    const y = Math.round((canvasY - this.padding) / this.squareSize);
    this.cellClick.next({ x, y });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.world) {
      requestAnimationFrame(() => {
        this.draw();
      });
    }
  }

  ngAfterViewInit(): void {
    this.draw();
  }

  draw() {
    this.drawingContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawBoard();
    this.drawCells();
  }

  drawBoard() {
    for (let x = 0; x <= this.gridWidth; x += this.squareSize) {
      this.drawingContext.moveTo(0.5 + x + this.padding, this.padding);
      this.drawingContext.lineTo(
        0.5 + x + this.padding,
        this.gridHeight + this.padding
      );
    }
    for (let y = 0; y <= this.gridHeight; y += this.squareSize) {
      this.drawingContext.moveTo(this.padding, 0.5 + y + this.padding);
      this.drawingContext.lineTo(
        this.gridWidth + this.padding,
        0.5 + y + this.padding
      );
    }
    this.drawingContext.strokeStyle = "#dae1e7";
    this.drawingContext.stroke();
  }

  drawCells() {
    this.world.aliveCells().forEach(p => {
      this.drawCell(p);
    });
  }

  drawCell({ x, y }) {
    const canvasX = this.padding + x * this.squareSize + 0.5;
    const canvasY = this.padding + y * this.squareSize + 0.5;
    if (
      canvasX < 0 ||
      canvasX > this.canvasWidth ||
      canvasY < 0 ||
      canvasY > this.canvasHeight
    ) {
      return;
    }
    this.drawingContext.fillRect(
      canvasX,
      canvasY,
      this.squareSize - 0.5,
      this.squareSize - 0.5
    );
  }
}

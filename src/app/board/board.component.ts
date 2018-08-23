import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import World from "../logic/world/world";
import Point from "../logic/point";

@Component({
  selector: "gof-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  @Input() rows;
  @Input() columns;
  @Input() world: World;

  @Output() cellClick = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  isCellAliveAt(x, y) {
    return this.world.isCellAliveAt(new Point(x, y));
  }

  onCellClick(x, y) {
    this.cellClick.next({ x, y });
  }
}

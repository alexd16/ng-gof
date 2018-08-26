import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { BoardComponent } from "./board/board.component";
import { CanvasBoardComponent } from './canvas-board/canvas-board.component';

@NgModule({
  declarations: [AppComponent, BoardComponent, CanvasBoardComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

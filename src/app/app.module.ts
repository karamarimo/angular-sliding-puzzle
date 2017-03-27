import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';     // for NgModel

import { AppComponent }  from './app.component';
import { SlidingPuzzleComponent } from './sliding-puzzle.component';

import { RangeArray } from './range-array.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    SlidingPuzzleComponent,
    RangeArray
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

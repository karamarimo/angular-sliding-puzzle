import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';     // for NgModel
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent }  from './app.component';
import { SlidingPuzzleComponent } from './sliding-puzzle.component';
import { ImagePickerComponent } from './image-picker.component';

import { RangeArray } from './range-array.pipe';
import { IntToMinSec } from "./int-to-min-sec.pipe";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    SlidingPuzzleComponent,
    ImagePickerComponent,
    RangeArray,
    IntToMinSec
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

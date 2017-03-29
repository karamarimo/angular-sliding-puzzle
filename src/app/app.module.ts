import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';     // for NgModel

import { AppComponent }  from './app.component';
import { SlidingPuzzleComponent } from './sliding-puzzle.component';
import { ImagePickerComponent } from './image-picker.component';

import { RangeArray } from './range-array.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    SlidingPuzzleComponent,
    ImagePickerComponent,
    RangeArray
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

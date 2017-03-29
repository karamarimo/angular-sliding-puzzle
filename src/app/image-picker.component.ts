import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'image-picker',
  templateUrl: './image-picker.component.html',
  // styleUrls: ['./image-picker.component.css'],
})
export class ImagePickerComponent { 
  @Output() imageSelected = new EventEmitter<string>();

  constructor() {

  }

  onFileChange(e: any) {
    console.log(e);
    if (e && e.target && e.target.files && e.target.files.length > 0) {
      if (e.target.files[0].type.match(new RegExp("^image/")) === null) {
        alert("You selected a non-image file!\nSelect an image file!");
        e.target.value = "";
      } else {
        let blob = window.URL.createObjectURL(e.target.files[0]);
        this.imageSelected.emit(blob);
      }
    } else {

    }
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'block',
  templateUrl: './block.component.html',
  styles: [`
    .block {
      border-radius: 5px;
      background: url("/image2.jpg");
    }
  `],
})
export class BlockComponent implements OnInit {
  @Input() originalX: number;
  @Input() originalY: number;
  @Input() size: number;
  X: number;
  Y: number;

  constructor(
  ) {}

  ngOnInit(): void {
    this.X = this.originalX;
    this.Y = this.originalY;
  }

}

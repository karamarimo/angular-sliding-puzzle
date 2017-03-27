import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Block } from './block';

@Component({
  selector: 'sliding-puzzle',
  templateUrl: './sliding-puzzle.component.html',
  styleUrls: ['./sliding-puzzle.component.css'],
})
export class SlidingPuzzleComponent implements OnInit { 
  imageUrl: string = "/image2.jpg";
  block_size = 100;
  margin = 5;
  readonly row_count = 4;
  readonly col_count = 5;
  readonly blank_block_id = this.row_count * this.col_count - 1;
  blank_block: Block;
  blocks : Block[] = [];      // order never changes
  blockMap: Block[][] = [];   // block object at each current coords
  showingResult = false;

  constructor(
  ) {}

  ngOnInit(): void {
    for (let i = 0; i < this.row_count; i++) {
      let row: Block[] = [];
      for (let j = 0; j < this.col_count; j++) {
        let block = new Block();
        block.Y = i;
        block.X = j;
        let isBlank = (i * this.col_count + j === this.blank_block_id);
        block.styles = this.createStylesForBlockAt(i, j, isBlank);
        row.push(block);
        this.blocks.push(block);
      }
      this.blockMap.push(row);
    }

    this.blank_block = this.blocks[this.blank_block_id];
  }

  getStylesForBlockFor(id: number): any {
    return this.blocks[id].styles;
  }

  private createStylesForBlockAt(row: number, col: number, blank: boolean = false): any {
    let styles = {
      "position": `absolute`,
      "visibility": blank ? "hidden" : "visible",
      "left": `${col * (this.block_size + this.margin)}px`,
      "top": `${row * (this.block_size + this.margin)}px`,
      "height": `${this.block_size}px`,
      "width": `${this.block_size}px`,
      "background-image": `url(${this.imageUrl})`,
      "background-size": `${this.col_count * this.block_size}px ${this.row_count * this.block_size}px`,
      "background-position": `-${col * this.block_size}px -${row * this.block_size}px`
    };
    return styles;
  }

  blockClicked(id: number): void {
    if (this.showingResult) return;

    let block1 = this.blocks[id];
    let Y1 = block1.Y;
    let X1 = block1.X;
    let Y2 = this.blank_block.Y;
    let X2 = this.blank_block.X;

    if (Math.abs(Y1 - Y2) + Math.abs(X1 - X2) !== 1) {
      // do nothing if the clicked block is not next to the blank block
      return;
    }
    // swap two blocks' positions
    let left1 = block1.styles.left;
    let top1 = block1.styles.top;
    block1.styles.left = this.blank_block.styles.left;
    block1.styles.top = this.blank_block.styles.top;
    this.blank_block.styles.left = left1;
    this.blank_block.styles.top = top1;
    block1.Y = Y2;
    block1.X = X2;
    this.blank_block.Y = Y1;
    this.blank_block.X = X1;
    this.blockMap[Y1][X1] = this.blank_block;
    this.blockMap[Y2][X2] = block1;

    if (this.areAllBlocksInPlace()) {
      this.showingResult = true;
    }
  }

  areAllBlocksInPlace(): boolean {
    for (let i = 0; i < this.blocks.length; i++) {
      let block = this.blocks[i];
      let originX = i % this.col_count;
      let originY = (i - originX) / this.col_count; 
      if (block.Y !== originY || block.X !== originX) {
        return false;
      }
    }
    return true;
  }

  closeResult() {
    this.showingResult = false;
  }
}

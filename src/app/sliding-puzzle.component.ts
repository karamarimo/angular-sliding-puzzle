import { Component, OnInit,  } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Block } from './block';

@Component({
  selector: 'sliding-puzzle',
  templateUrl: './sliding-puzzle.component.html',
  styleUrls: ['./sliding-puzzle.component.css'],
  animations: [
    trigger('resultState', [
      state('shown', style({
        opacity: 1,
        transform: 'translateY(0)',
      })),
      transition('void => shown', [
        style({
          opacity: 0,
          transform: 'translateY(-50%)',
        }),
        animate("200ms 1.5s"),
      ]),
      transition('shown => void', [
        animate(200, style({transform: 'translateY(-50%)'})),
      ]),
    ]),
  ],
})
export class SlidingPuzzleComponent implements OnInit { 
  imageUrl: string = "/image2.jpg";
  block_size = 100;
  margin = 3;
  row_count: number = 2;   // set this to at least 2
  col_count: number = 2;   // set this to at least 2
  blank_block: Block;
  blocks : Block[];      // order never changes
  blockMap: Block[][];   // block object at each current coords
  showingResult = false;
  showOriginalPos = true;
  time: number;
  timerId: number;

  constructor(
  ) {

  }

  ngOnInit(): void {
    this.initGame();
  }

  initGame() {
    this.blockMap = [];
    this.blocks = [];
    let blankId = this.col_count * this.row_count - 1;
    for (let i = 0; i < this.row_count; i++) {
      let row: Block[] = [];
      for (let j = 0; j < this.col_count; j++) {
        let block = new Block();
        block.Y = i;
        block.X = j;
        let isBlank = (i * this.col_count + j === blankId);
        block.styles = this.createStylesForBlockAt(i, j, isBlank);
        row.push(block);
        this.blocks.push(block);
      }
      this.blockMap.push(row);
    }

    this.blank_block = this.blocks[blankId];

    this.shuffleUntilNotAllInPlace();
    this.resetTimer();
  }

  private resetTimer(): void {
    window.clearInterval(this.timerId);
    this.time = 0;
    this.timerId = window.setInterval(() => {
      if (!this.showingResult) {
        this.time += 1;
      }
    }, 1000);
  }

  changeSize(key: string): void {
    switch (key) {
      case 'r-':
        if (this.row_count >= 3) {
          this.row_count -= 1;
          this.initGame();
        }
        break;
      case 'r+':
        this.row_count += 1;
        this.initGame();
        break;
      case 'c-':
        if (this.col_count >= 3) {
          this.col_count -= 1;
          this.initGame();
        }
        break;
      case 'c+':
        this.col_count += 1;
          this.initGame();
        break;
      default:
        break;
    }
  }

  updateImage(imageUrl: string): void {
    this.imageUrl = imageUrl;
    for (var i = 0; i < this.blocks.length; i++) {
      var block = this.blocks[i];
      block.styles["background-image"] = `url(${this.imageUrl})`;
    }
  }

  getStylesForBlockFor(id: number): any {
    return this.blocks[id].styles;
  }

  private createStylesForBlockAt(row: number, col: number, blank: boolean = false): any {
    let styles = {
      "opacity": blank ? "0" : "1",
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
    this.swapBlocks(block1, this.blank_block);

    if (this.areAllBlocksInPlace()) {
      this.showResult();
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

  showResult() {
    this.showingResult = true;
    this.blank_block.styles.opacity = 1;
  }

  closeResult() {
    this.showingResult = false;
    this.initGame();
    this.blank_block.styles.opacity = 0;
  }

  private placeBlockAt(block: Block, row: number, col: number): void {
    block.styles.left = `${col * (this.block_size + this.margin)}px`;
    block.styles.top = `${row * (this.block_size + this.margin)}px`;
    block.Y = row;
    block.X = col;
    this.blockMap[row][col] = block;
  }

  private shuffleUntilNotAllInPlace() {
    if (this.col_count == 1 && this.row_count == 1) {
      throw Error("shuffleUntilNotAllInPlace: cannot shuffle so that not all are in place because of too few tiles");
    }
    do {
      this.shuffleBlocks();
    } while(this.areAllBlocksInPlace());
  }

  private shuffleBlocks() {
    let shaffled = Array(this.row_count * this.col_count).fill(0).map((v, i) => i);
    SlidingPuzzleComponent.shuffleArray(shaffled);

    // console.log("before", shaffled);
    // if it's not solvable, swap two non-blank blocks to make it solvable
    if (!SlidingPuzzleComponent.isSolvable(shaffled, this.row_count, this.col_count)) {
      const blank_id = shaffled.indexOf(Math.max(...shaffled));
      
      if (blank_id < this.col_count) {
        // if the blank is on the first row, swap the last two
        let temp = shaffled[shaffled.length - 1];
        shaffled[shaffled.length - 1] = shaffled[shaffled.length - 2];
        shaffled[shaffled.length - 2] = temp;
      } else {
        // otherwise, swap the first two
        let temp = shaffled[0];
        shaffled[0] = shaffled[1];
        shaffled[1] = temp;
      }
      // console.log("after", shaffled);
    } {
    }

    for (let i = 0; i < this.row_count; i++) {
      for (let j = 0; j < this.col_count; j++) {
        let idx = i * this.col_count + j;
        let block = this.blocks[shaffled[idx]];
        this.placeBlockAt(block, i, j);
      }
    }
  }

  private static shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  // see https://www.sitepoint.com/randomizing-sliding-puzzle-tiles/
  private static isSolvable(blocks: number[], rows: number, cols: number): boolean {
    // assuming the largest number is the blank block
    if (blocks.length !== rows * cols) throw Error("isSolvable: invalid parameters");
    
    const inv_count = SlidingPuzzleComponent.countInversions(blocks);
    // console.log(inv_count);
    if (cols % 2 === 1) {
      return inv_count % 2 === 0;
    } else {
      const blank_row = Math.floor(blocks.indexOf(Math.max(...blocks)) / cols);
      // console.log(blank_row);
      return (inv_count + rows - (blank_row + 1)) % 2 === 0;
    }
  }

  private static countInversions(array: number[]): number {
    // assuming the largest number is the blank block
    // summerize the number of inversions for all elements
    return array.map((v, i) => SlidingPuzzleComponent.countInversionsFor(array, i))
                .reduce((v1, v2) => v1 + v2, 0);
  }

  private static countInversionsFor(array: number[], idx: number): number {
    // assuming the largest number is the blank block
    let total = 0;
    const blankBlock = Math.max(...array);
    const val = array[idx];
    if (val === blankBlock) return 0;

    for (let j = idx + 1; j < array.length; j++) {
      let val2 = array[j];
      if (val > val2) {
        total += 1;
      }
    }

    return total;
  }

  private swapBlocks(block1: Block, block2: Block): void {
    let Y1 = block1.Y;
    let X1 = block1.X;
    let Y2 = block2.Y;
    let X2 = block2.X;
    this.placeBlockAt(block1, Y2, X2);
    this.placeBlockAt(block2, Y1, X1);
  }
}

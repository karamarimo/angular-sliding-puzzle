import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: "intToMinSec"})
export class IntToMinSec implements PipeTransform {
    transform(value: number): string {
      if (value % 1 === 0 && value >= 0) {
        let min = Math.floor(value / 60).toString();
        let sec = (value % 60).toString();
        if (sec.length < 2) {
          sec = "0" + sec;
        }
        return `${min}:${sec}`;
      } else {
        throw new Error('rangeArray pipe: parameter is invalid');
      }
    }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: "rangeArray"})
export class RangeArray implements PipeTransform {
    transform(value: number): number[] {
      if (value % 1 === 0 && value >= 0) {
        return Array(value).fill(0).map((x,i)=>i);
      } else {
        throw new Error('rangeArray pipe: parameter is invalid');
      }
    }
}

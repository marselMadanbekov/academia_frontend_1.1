import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chunk'
})
export class ChunkPipe implements PipeTransform {
  transform(value: any[], chunkSize: number): any[][] {
    const calendarDaysArray: any[] = value;
    const calendarDays: any[][] = [];

    while (calendarDaysArray.length) {
      const weekDays: any[] = calendarDaysArray.splice(0, chunkSize);
      calendarDays.push(weekDays);
    }

    return calendarDays;
  }
}

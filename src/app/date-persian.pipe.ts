import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePersian',
})
export class DatePersianPipe implements PipeTransform {
  transform(value: any, ...args: any[]): string {
    const myDate = value.toDate();
    return myDate.toLocaleDateString('fa-IR');
  }
}

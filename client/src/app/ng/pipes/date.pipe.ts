import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ngDate',
})
export class DatePipe implements PipeTransform {
  constructor() {}

  transform(value: any, locale: 'fa-ir' | 'en-us'): string {
    if (value) return new Date(value).toLocaleDateString(locale);
    else return null;
  }
}

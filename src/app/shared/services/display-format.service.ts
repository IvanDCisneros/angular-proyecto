import { Injectable } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Injectable()
export class DisplayFormatService {
  constructor(private datePipe: DatePipe, private currencyPipe: CurrencyPipe) { }

  getDisplayFormat(value: any, format: string) {
    switch (format) {
      case 'date':
        value = this.datePipe.transform(value);
        break;
      case 'currency':
        value = this.currencyPipe.transform(value, undefined, 'symbol', '3.0');
        break;
      case 'uppercase':
        value = value.toUpperCase();
        break;
      case 'myDate':
        value = this.datePipe.transform(value, 'yyyy/MM/dd');
        break;
    }
    return value;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormFormatService {

  constructor() { }

  onCurrency(event: any) {
    let value = event.target.value;
    if(value && !value.startsWith('BDT ')) {
    if (!value.includes('.')) {
      value += '.00';
    }
    event.target.value = 'BDT ' + value;
    }
  }

  onAmountInput(event: any) {
    let value = event.target.value;
    value = value.replace(/[^\d.]/g, '');
    value = value.replace(/^0+(?=\d)/, '');
    const parts = value.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (parts[1]) {
      parts[1] = parts[1].substring(0, 2);
    }
    value = parts.join('.');
    event.target.value = value;
  }

}

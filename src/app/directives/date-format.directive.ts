import {Directive, ElementRef, HostListener, Input} from "@angular/core";
import {NgControl} from "@angular/forms";

@Directive({
  selector: '[appFormatDateInput]',
  standalone: true
})
export class FormatDateInputDirective {
  @Input('appFormatDateInput') controlName: string | undefined;

  constructor(private elementRef: ElementRef, private ngControl: NgControl) {
  }

  // Listen to keydown events
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const inputElement = this.elementRef.nativeElement;
    const value = inputElement.value;

    // Check for 'Tab' or 'Enter' keys
    if (event.key === 'Tab' || event.key === 'Enter') {
      console.log(value);
      const formattedDate = this.formatDate(value);

      if (formattedDate) {
        // Patch the formatted value into the form control
        this.ngControl.control?.patchValue(new Date(formattedDate));
      }
    }
  }

  // Listen to keydown events
  // Listen to blur events
  @HostListener('change', ['$event'])
  onChange(event) {
    const inputElement = this.elementRef.nativeElement;
    const value = inputElement.value;
    console.log(event.target.value)
    if (value) {
      const formattedDate = this.formatDate(value);
      if (formattedDate) {
        this.ngControl.control?.patchValue(new Date(formattedDate));
      }
    }
  }

  // Format the date input value
  private formatDate(input: string): string {
    input = input.toString();
    console.log(input)
    // if(!this.isValidInput(input)){
    //   return ''
    // }
    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Current month as MM
    const currentYear = currentDate.getFullYear().toString(); // Current year as YYYY

    let day, month, year;
    if (input.includes('/')) {
      const parts = input.split('/');
      day= parts[0] ? parts[0]: currentDate;
      month = parts[1] ? parts[1]: currentMonth;
      year = parts[2] ? parts[2] : currentYear;
    } else if (input.includes('-')) {
      const parts = input.split('-');
      if (parts.length === 3) {
        day = parts[0];
        month = parts[1];
        year = parts[2];

        year = year.length === 2 ? '20' + year : year;
        return `${month}/${day}/${year}`;
      } else {
        return '';
      }
    } else if (input.length === 1) {
      day = input;
      month = currentMonth;
      year = currentYear;
    } else if (input.length === 2) {
      day = input;
      month = currentMonth;
      year = currentYear;
    }
    else if (input.length === 3) {
      day = input.slice(0, 2);
      month = input.slice(2);
      year = currentYear;
    }else if (input.length === 4) {
      day = input.slice(0, 1);
      month = input.slice(1, 2);
      year = input.slice(2);
      year = '20' + year;
    } else if (input.length === 5) {
      day = input.slice(0, 2);
      month = input.slice(2, 3);
      year = input.slice(3);
      year = '20' + year;
    }else if (input.length === 6) {
      day = input.slice(0, 2);
      month = input.slice(2, 4);
      year = input.slice(4);
      year = year.length === 2 ? '20' + year : year;
    }else if (input.length === 7) {
      day = input.slice(0, 2);
      month = input.slice(2, 3);
      year = input.slice(4);
    } else if (input.length === 8) {
      day = input.slice(0, 2);
      month = input.slice(2, 4);
      year = input.slice(4);
    } else {
      return ''
    }

    return `${month}/${day}/${year}`;
  }
}

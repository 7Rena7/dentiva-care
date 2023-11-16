import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateSpanishFormat',
})
export class DateSpanishFormatPipe implements PipeTransform {
  transform(value: string | undefined | null): string {
    if (!value) {
      return ''; // Return empty string for undefined or null values
    }

    const parts = value.split('-');
    if (parts.length !== 3) {
      return value; // Return as is if not in the expected format
    }

    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  }
}

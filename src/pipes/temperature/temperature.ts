import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TemperaturePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'temperaturePipe',
})
export class TemperaturePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    var c = Math.round(parseInt(value,10) - 273.15);
    return `${c} °C`;
  }
}

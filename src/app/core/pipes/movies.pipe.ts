import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movies',
  standalone: false
})
export class MoviesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

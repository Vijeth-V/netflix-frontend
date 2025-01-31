import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesPipe } from './pipes/movies.pipe';

@NgModule({
  declarations: [MoviesPipe],
  imports: [CommonModule],
})
export class CoreModule {}

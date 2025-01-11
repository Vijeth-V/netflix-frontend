import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-details',
  standalone: false,

  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  bgImageVariable = '';

  movie = {
    poster_path: 'd8Ryb8AunYAuycVKDp5HpdWPKgC.jpg',
  };
}

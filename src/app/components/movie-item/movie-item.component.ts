import { Component, Input } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-item',
  standalone: false,

  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.css',
})
export class MovieItemComponent {
  @Input() movie: any = [];
  constructor(private movieService: MovieService, private router: Router) {}

  movieDetails(movie: any) {
    console.log('Movie Details Triggered', movie);
    this.router.navigate(['/movieDetails'], { queryParams: { id: movie.id } });
  }
}

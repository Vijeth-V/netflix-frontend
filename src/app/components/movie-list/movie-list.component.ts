import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  standalone: false,

  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent {
  movies: [] = [];
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    console.log('getMovies list component');
    this.movieService.getMovies(1).subscribe((res: any) => {
      console.log(res);
      this.movies = res.results;
    });
  }
}

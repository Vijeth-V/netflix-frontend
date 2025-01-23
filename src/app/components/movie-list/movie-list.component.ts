import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-movie-list',
  standalone: false,

  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent {
  movies: [] = [];
  username: string = '';

  constructor(
    private movieService: MovieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getMovies();
    if (this.authService.userValue?.username) {
      this.username = this.authService.userValue?.username;
      console.log('authService in movie list page', this.username);
    }
  }

  getMovies() {
    console.log('getMovies list component');
    this.movieService.getMovies(1).subscribe((res: any) => {
      console.log(res);
      this.movies = res.results;
    });
  }
}

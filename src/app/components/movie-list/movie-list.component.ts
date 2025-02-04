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
  movies: any[] = [];
  username: string = '';
  currentPage = 1;

  constructor(
    private movieService: MovieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.userValue?.username) {
      this.username = this.authService.userValue?.username;
      console.log('authService in movie list page', this.username);
    }
    this.getMovies(1);
  }

  getMovies(page: number) {
    console.log('getMovies list component', page);
    this.movieService.getMovies().subscribe((res: any) => {
      console.log(res);
      this.movies = [...this.movies, ...res.results];
      console.log('this.movies', this.movies);
    });
  }

  onScroll() {
    console.log('scrolled!!');
    this.getMovies(++this.currentPage);
  }
}

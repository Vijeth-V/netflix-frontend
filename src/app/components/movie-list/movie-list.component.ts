import { Component, HostListener } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { AuthService } from '../../services/auth/auth.service';
import { ScrollPositionService } from '../../services/scroll-position.service';

@Component({
  selector: 'app-movie-list',
  standalone: false,

  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
@HostListener('window:scroll', [])
export class MovieListComponent {
  movies: any[] = [];
  username: string = '';
  currentPage = 1;

  constructor(
    private movieService: MovieService,
    private authService: AuthService,
    private scrollService: ScrollPositionService
  ) {}

  ngOnInit(): void {
    if (this.authService.userValue?.username) {
      this.username = this.authService.userValue?.username;
      console.log('authService in movie list page', this.username);
    }
    // this.getMovies(1);

    // Retrieve stored movies and page number
    const storedMovies = this.scrollService.getMovies();
    const storedPage = this.scrollService.getCurrentPage();

    if (storedMovies.length > 0) {
      this.movies = storedMovies;
      this.currentPage = storedPage;
      console.log('Loaded stored movies:', this.movies);
    } else {
      this.getMovies(1);
    }
  }

  getMovies(page: number) {
    console.log('getMovies list component', page);
    this.movieService.getMovies().subscribe((res: any) => {
      this.movies = [...this.movies, ...res.results];

      // Store movies and current page in the service
      this.scrollService.setMovies(this.movies, page);
      console.log('Updated movies:', this.movies);
    });
  }

  onScroll() {
    console.log('scrolled!!');
    this.getMovies(++this.currentPage);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      window.scrollTo(0, this.scrollService.getScrollPosition());
    }, 100);
  }
}

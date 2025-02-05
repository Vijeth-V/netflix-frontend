import { Component, HostListener, Input } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';
import { ScrollPositionService } from '../../services/scroll-position.service';

@Component({
  selector: 'app-movie-item',
  standalone: false,

  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.css',
})
@HostListener('window:scroll', [])
export class MovieItemComponent {
  @Input() movie: any = [];
  constructor(
    private movieService: MovieService,
    private router: Router,
    private scrollService: ScrollPositionService
  ) {}

  movieDetails(movie: any) {
    console.log('Movie Details Triggered', movie);
    this.router.navigate(['/movieDetails'], { queryParams: { id: movie.id } });
    this.onWindowScroll();
  }

  onWindowScroll() {
    const position = window.scrollY || document.documentElement.scrollTop;
    this.scrollService.setScrollPosition(position);
  }
}

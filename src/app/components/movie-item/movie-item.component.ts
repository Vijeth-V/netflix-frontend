import { Component, Input } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-item',
  standalone: false,

  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.css',
})
export class MovieItemComponent {
  @Input() movie: any = [];
  constructor(private movieService: MovieService) {}
}

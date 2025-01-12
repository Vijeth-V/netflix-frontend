import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { movieDetails } from '../../services/interfaces/movies.interface';

@Component({
  selector: 'app-movie-details',
  standalone: false,

  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit {
  bgImageVariable = '';

  movieDetails: movieDetails | null = null;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      console.log('Params', params);
      const idString = params.get('id');
      const id = idString ? +idString : null;
      this.getMovieDetails(id);
    });
  }

  getMovieDetails(id: number | null) {
    if (id) {
      this.movieService.getMovieDetails(id).subscribe((res: any) => {
        this.movieDetails = res;

        console.log('this.movieDetails', this.movieDetails);
      });
    }
  }
}

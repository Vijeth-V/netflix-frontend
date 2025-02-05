import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  movieRes,
  Result,
  movieDetails,
} from '../../core/interfaces/movies.interface';

import { BehaviorSubject, Subject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  baseUrl = environment.BASE_URL;
  api_key = environment.TMBD_KEY;

  currentPage = 1;

  private movieList: movieDetails[] = [];
  movieSubject$ = new BehaviorSubject(this.movieList);
  movieDetailsSubject$ = new Subject();
  movieVideoSubject$ = new Subject();

  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http
      .get<movieRes>(
        `${this.baseUrl}popular?api_key=${this.api_key}&page=${this.currentPage}`
      )
      .pipe(
        tap((res: any) => {
          this.movieList = [...this.movieList];
          this.movieSubject$.next(this.movieList);
        })
      );
  }

  // https://api.themoviedb.org/3/movie/{movie_id}/videos
  getMovieDetails(id: number) {
    return this.http
      .get<movieDetails>(`${this.baseUrl}${id}?api_key=${this.api_key}`)
      .pipe(
        tap((res: any) => {
          this.movieDetailsSubject$.next(res);
        })
      );
  }

  getVideo(id: number) {
    console.log('Get Video details By id is trigered', id);
    return this.http
      .get(`${this.baseUrl}${id}/videos?api_key=${this.api_key}`)
      .pipe(
        tap((res: any) => {
          this.movieVideoSubject$.next(res);
        })
      );
  }
}

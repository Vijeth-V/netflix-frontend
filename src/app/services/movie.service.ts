import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { movieRes, Result } from './interfaces/movies.interface';

import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  // baseUrl = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
  baseUrl =
    'https://api.themoviedb.org/3/movie/popular?api_key=7f91731a4b8758467428c3dd21f0adf4';
  movieSubject$ = new Subject<movieRes>();

  constructor(private http: HttpClient) {}

  getMovies(page: number) {
    return this.http.get<movieRes>(`${this.baseUrl}&page=${page}`).pipe(
      tap((res: any) => {
        this.movieSubject$.next(res);
      })
    );
  }

  signIn() {
    console.log('Signin service triggered');
  }
}

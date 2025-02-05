import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollPositionService {
  private scrollPosition = 0;
  private movies: any[] = [];
  private currentPage = 1;

  // Save the scroll position
  setScrollPosition(position: number) {
    this.scrollPosition = position;
    console.log('this setScrollPosition from services', this.scrollPosition);
  }

  // Retrieve the scroll position
  getScrollPosition(): number {
    console.log('this getScrollPosition from services', this.scrollPosition);
    return this.scrollPosition;
  }

  setMovies(movies: any[], page: number) {
    this.movies = movies;
    this.currentPage = page;
  }

  // Get stored movies
  getMovies(): any[] {
    return this.movies;
  }

  // Get the last stored page
  getCurrentPage(): number {
    return this.currentPage;
  }
}

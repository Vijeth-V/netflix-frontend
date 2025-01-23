import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import {
  AppUserAuth,
  AuthDto,
  LoginDto,
} from '../core/interfaces/auth.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authServerPath = 'http://localhost:5566/api/v1/auth';
  private jwtHelper = new JwtHelperService();

  userValue:
    | {
        id: string;
        username: string;
        email: string;
        role: string;
        tmdb_key: string;
        jwtToken: string;
      }
    | undefined;

  constructor(private http: HttpClient, private router: Router) {}

  //signup new user
  signup(signup_body: object) {
    return this.http
      .post<AuthDto>(`${this.authServerPath}/signup`, signup_body)
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValueByToken({ accessToken, role });
          this.router.navigate(['/movieList']);
        }),
        catchError((error) => {
          return throwError('Something went wrong during sign up!', error);
        })
      );
  }

  //Login API service
  signin(signin_body: object) {
    return this.http
      .post<AuthDto>(`${this.authServerPath}/signin`, signin_body)
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValueByToken({ accessToken, role });
          this.router.navigate(['/movieList']);
        }),
        catchError((error) => {
          return throwError('Something went wrong during sign in!', error);
        })
      );
  }

  //Verifies if its a new user during signup
  checkEmail(email: object) {
    return this.http.post(`${this.authServerPath}/check-email`, email);
  }

  //logout function
  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/home']);
  }

  //Decoding and storing access token
  private setUserValueByToken({ accessToken, role }: AuthDto) {
    localStorage.setItem('access_token', accessToken);

    const { id, username, email, tmdb_key, exp } =
      this.jwtHelper.decodeToken(accessToken);

    this.userValue = {
      ...{ id, username, email, role, tmdb_key },
      jwtToken: accessToken,
    };
  }
}

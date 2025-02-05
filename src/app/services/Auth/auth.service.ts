import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import {
  AppUserAuth,
  AuthDto,
  LoginDto,
} from '../../core/interfaces/auth.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authServerPath = 'http://localhost:5566/api/v1/auth';
  private jwtHelper = new JwtHelperService();

  private userSubject = new BehaviorSubject<
    | {
        id: string;
        username: string;
        email: string;
        role: string;
        tmdb_key: string;
        jwtToken: string;
      }
    | undefined
  >(undefined);

  userValue$ = this.userSubject.asObservable();

  // userValue:
  //   | {
  //       id: string;
  //       username: string;
  //       email: string;
  //       role: string;
  //       tmdb_key: string;
  //       jwtToken: string;
  //     }
  //   | undefined;

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

  updateRole() {
    if (localStorage.getItem('role') === 'USER') {
      localStorage.setItem('role', 'ADMIN');
      this.router.navigate(['/movieList']);
    } else {
      this.router.navigate(['/movieList']);
    }
  }

  //logout function
  logout() {
    localStorage.clear();
    this.userSubject.next(undefined);
    this.router.navigate(['/home']);
  }

  //Decoding and storing access token
  private setUserValueByToken({ accessToken, role }: AuthDto) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('role', role);

    this.getUserValue({ accessToken, role });
  }

  getUserValue({ accessToken, role }: AuthDto) {
    //   const { id, username, email, tmdb_key, exp } =
    //     this.jwtHelper.decodeToken(accessToken);

    //   this.userValue = {
    //     ...{ id, username, email, role, tmdb_key },
    //     jwtToken: accessToken,
    //   };
    // }
    if (!accessToken) {
      this.userSubject.next(undefined);
      return;
    }

    const { id, username, email, tmdb_key } =
      this.jwtHelper.decodeToken(accessToken);

    const userData = {
      id,
      username,
      email,
      role,
      tmdb_key,
      jwtToken: accessToken,
    };

    this.userSubject.next(userData);
  }

  checkLoginStatus() {
    const accessToken = localStorage.getItem('access_token') ?? '';
    const role = localStorage.getItem('role') || 'USER';
    this.getUserValue({ accessToken, role });
  }
}

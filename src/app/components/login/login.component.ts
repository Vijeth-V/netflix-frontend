import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  loginMsg = '';

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // this.loginForm = this.fb.group({
    //   email: ['', [Validators.required, Validators.minLength(10)]],
    //   pwd: ['', [Validators.required, Validators.minLength(8)]],
    // });

    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  login() {
    console.log(this.loginForm.value);
    this.authService.signin(this.loginForm.value).subscribe(
      (res) => {
        console.log('Login API successfull');
        this.loginMsg = '';
      },
      (err) => {
        console.log('Login API failed', err);
        this.loginMsg = 'Invalid Login credentials check email ID and password';
      }
    );

    // this.router.navigate(['/movieList']);
  }
}

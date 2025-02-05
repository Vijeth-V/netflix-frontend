import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-mainpage',
  standalone: false,

  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css',
})
export class MainpageComponent {
  homeForm!: FormGroup;
  username: string = '';
  actionName: string = 'Sign In';

  get email() {
    return this.homeForm.get('email');
  }
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('access_token')) {
      console.log('User already logged in');
      this.authService.checkLoginStatus();
    }
    this.homeForm = new FormGroup({
      email: new FormControl('', Validators.required),
    });
  }

  register() {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['/movieList']);
    } else {
      if (this.email) {
        console.log('email', this.email.value);
        this.router.navigate(['/register/step1'], {
          state: { data: this.email.value },
        });
      }
    }
  }
}

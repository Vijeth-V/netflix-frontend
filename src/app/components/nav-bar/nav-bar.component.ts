import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,

  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  constructor(private router: Router, private authService: AuthService) {}

  @Input() buttonName: string = 'Sign In';
  @Input() userName: string = '';

  signIn() {
    if (this.buttonName === 'Sign In') {
      this.router.navigate(['/login']);
    } else {
      this.authService.logout();
    }
  }
}

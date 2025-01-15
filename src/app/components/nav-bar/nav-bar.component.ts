import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav-bar',
  standalone: false,

  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  constructor(private router: Router) {}

  @Input() buttonName: string = 'Sign In';

  signIn() {
    console.log('Signin clicked');
    this.router.navigate(['/login']);
  }
  navigateToHome() {
    this.router.navigate(['/home']);
  }
}

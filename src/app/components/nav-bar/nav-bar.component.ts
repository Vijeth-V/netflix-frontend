import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,

  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  userName: string = '';
  buttonName: string = 'Sign In';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.userValue$.subscribe((user) => {
      if (user?.username) {
        console.log('Nav bar component triggered ');
        this.buttonName = 'Log out';
        this.userName = user.username;
      } else {
        this.buttonName = 'Sign In';
        this.userName = '';
      }
    });
  }

  signIn() {
    if (this.buttonName === 'Sign In') {
      this.router.navigate(['/login']);
    } else {
      this.authService.logout();
    }
  }
}

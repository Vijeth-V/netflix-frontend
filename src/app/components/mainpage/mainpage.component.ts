import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpage',
  standalone: false,

  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css',
})
export class MainpageComponent {
  homeForm!: FormGroup;

  get email() {
    return this.homeForm.get('email');
  }
  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.homeForm = new FormGroup({
      email: new FormControl('', Validators.required),
    });
  }

  register() {
    if (this.email) {
      console.log('email', this.email.value);
      this.router.navigate(['/register/step1'], {
        state: { data: this.email.value },
      });
    }
  }
}

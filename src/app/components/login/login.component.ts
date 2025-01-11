import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  get email() {
    return this.loginForm.get('email');
  }

  get pwd() {
    return this.loginForm.get('pwd');
  }

  constructor(private fb: FormBuilder) {}

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
      pwd: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }
}

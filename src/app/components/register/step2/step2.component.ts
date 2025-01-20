import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step2',
  standalone: false,

  templateUrl: './step2.component.html',
  styleUrl: './step2.component.css',
})
export class Step2Component implements OnInit {
  tmdbForm!: FormGroup;

  get userName() {
    return this.tmdbForm.get('userName');
  }

  get apiKey() {
    return this.tmdbForm.get('apiKey');
  }

  registrationData: { Email: string; Password: string } | undefined;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.tmdbForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      apiKey: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
    this.recieveData();
  }

  recieveData() {
    this.registrationData = {
      Email: history.state.data.email,
      Password: history.state.data.pwd,
    };
  }

  onSubmit() {
    if (this.registrationData && this.tmdbForm.value) {
      const credentials = {
        Email: this.registrationData.Email,
        password: this.registrationData.Password,
        userName: this.tmdbForm.value.userName,
        tmbdAPIKey: this.tmdbForm.value.apiKey,
      };
      this.router.navigate(['/register/step3'], {
        state: { data: credentials },
      });
    }
  }
}

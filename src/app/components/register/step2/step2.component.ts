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
  }

  onSubmit() {
    console.log(this.tmdbForm.value);
    this.router.navigate(['/register/step3']);
  }
}

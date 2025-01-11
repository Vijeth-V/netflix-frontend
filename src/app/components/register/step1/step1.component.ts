import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-step1',
  standalone: false,

  templateUrl: './step1.component.html',
  styleUrl: './step1.component.css',
})
export class Step1Component implements OnInit {
  registerForm!: FormGroup;

  get email() {
    return this.registerForm.get('email');
  }

  get pwd() {
    return this.registerForm.get('pwd');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // this.registerForm = this.fb.group({
    //   email: ['', [Validators.required, Validators.minLength(10)]],
    //   pwd: ['', [Validators.required, Validators.minLength(8)]],
    // });

    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      pwd: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }
  onSubmit() {
    console.log(this.registerForm.value);
  }
}

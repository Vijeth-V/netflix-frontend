import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

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

  API_payload: { email: string } | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // this.registerForm = this.fb.group({
    //   email: ['', [Validators.required, Validators.minLength(10)]],
    //   pwd: ['', [Validators.required, Validators.minLength(8)]],
    // });

    this.registerForm = new FormGroup({
      email: new FormControl(history.state.data, [
        Validators.required,
        Validators.minLength(10),
        Validators.email,
      ]),
      pwd: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }
  onSubmit() {
    this.API_payload = { email: this.registerForm.value.email };
    this.authService.checkEmail(this.API_payload).subscribe((res: any) => {
      if (res === false) {
        this.router.navigate(['/register/step2'], {
          state: { data: this.registerForm.value },
        });
      } else {
        // this.email?.setErrors({ emailExists: true });
        console.log('Email Exists');
        alert('This email is already registered');
      }
    });
  }
}

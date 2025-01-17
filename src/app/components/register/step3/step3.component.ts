import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step3',
  standalone: false,

  templateUrl: './step3.component.html',
  styleUrl: './step3.component.css',
})
export class Step3Component {
  plans = [
    {
      planName: 'Basic',
      monthlyPrice: '$9.99',
      videoQuality: 'Good',
      resolution: '480p',
    },
    {
      planName: 'Standard',
      monthlyPrice: '$15.99',
      videoQuality: 'Better',
      resolution: '1080p',
    },
    {
      planName: 'Premium',
      monthlyPrice: '$19.99',
      videoQuality: 'Best',
      resolution: '4K + HDR',
    },
  ];

  constructor(private router: Router) {}

  selectedPlan: any = null;

  selectPlan(plan: any) {
    this.selectedPlan = plan;
  }

  onSubmit() {
    if (this.selectedPlan) {
      console.log('Selected Plan:', this.selectedPlan);
      this.router.navigate(['/movieList']);
    } else {
      alert('Please select a plan before submitting.');
    }
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { Step1Component } from './components/register/step1/step1.component';
import { Step2Component } from './components/register/step2/step2.component';
import { Step3Component } from './components/register/step3/step3.component';

const routes: Routes = [
  { path: 'home', component: MainpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register/step1', component: Step1Component },
  { path: 'register/step2', component: Step2Component },
  { path: 'register/step3', component: Step3Component },
  //Lazy Loading this module
  {
    path: 'movieList',
    loadChildren: () =>
      import('./components/movie-list/movie-list.component').then(
        (m) => m.MovieListComponent
      ),
  },

  //Lazy Loading this module
  {
    path: 'movieDetails',
    loadChildren: () =>
      import('./components/movie-details/movie-details.component').then(
        (m) => m.MovieDetailsComponent
      ),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: MainpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

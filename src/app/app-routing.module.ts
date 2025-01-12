import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainRegisterComponent } from './components/register/main-register/main-register.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

const routes: Routes = [
  { path: 'home', component: MainpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: MainRegisterComponent },
  { path: 'movieList', component: MovieListComponent },
  { path: 'movieDetails', component: MovieDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: MainpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

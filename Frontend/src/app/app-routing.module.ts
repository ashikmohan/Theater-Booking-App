import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { UserdashboardComponent } from './User/userdashboard/userdashboard.component';
import { AddmoviesComponent } from './Admin/addmovies/addmovies.component';
import { MoviefetchedComponent } from './Admin/moviefetched/moviefetched.component';

const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  // Admin Dashboard
  {path:'AdminDashboard',component:AdminDashboardComponent,
  children:[{path:'moviefetched',component:MoviefetchedComponent},
    {path:'moviefetched/addmovies',component:AddmoviesComponent}]

}

  ,
  // User Dashboard
  {path:'UserDashboard',component:UserdashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

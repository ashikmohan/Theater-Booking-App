import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { UserdashboardComponent } from './User/userdashboard/userdashboard.component';
import { AddmoviesComponent } from './Admin/addmovies/addmovies.component';
import { MoviefetchedComponent } from './Admin/moviefetched/moviefetched.component';
import { UsermoviefetchedComponent } from './User/usermoviefetched/usermoviefetched.component';
import { MoviedetailsComponent } from './User/moviedetails/moviedetails.component';
import { EditComponent } from './Admin/edit/edit.component';
import { userGuard } from './user.guard';
import { adminGuard } from './admin.guard';
import { TicketbokkingComponent } from './User/ticketbokking/ticketbokking.component';
const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  
  // User Dashboard
  {
    path: 'UserDashboard', canActivate:[userGuard],
    component: UserdashboardComponent,
    children: [
      { path: 'usermoviefetched', component: UsermoviefetchedComponent },
      { path: 'moviedetails/:id', component: MoviedetailsComponent },{path:'ticketbooking/:id',component:TicketbokkingComponent},
      { path: '', redirectTo: 'usermoviefetched', pathMatch: 'full' },
    ],
  },
  // Admin Dashboard
  {
    path: 'AdminDashboard', canActivate:[adminGuard],
    component: AdminDashboardComponent,
    children: [
      { path: 'moviefetched', component: MoviefetchedComponent },
      { path: 'moviefetched/addmovies', component: AddmoviesComponent },{path:'editdetails/:id',component:EditComponent},
      { path: '', redirectTo: 'moviefetched', pathMatch: 'full' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

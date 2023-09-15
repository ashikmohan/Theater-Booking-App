import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './homepage/navbar/navbar.component';
import { BodyComponent } from './homepage/body/body.component';
import { FooterComponent } from './homepage/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthserveService } from './authserve.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { UserdashboardComponent } from './User/userdashboard/userdashboard.component';
import { NavdComponent } from './navd/navd.component';
import { AddmoviesComponent } from './Admin/addmovies/addmovies.component';
import { MoviefetchedComponent } from './Admin/moviefetched/moviefetched.component';
import { AddmovieService } from './addmovie.service';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    BodyComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    AdminDashboardComponent,
    UserdashboardComponent,
    NavdComponent,
    AddmoviesComponent,
    MoviefetchedComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
    
    
    
  

  ],
  providers: [AuthserveService,AddmovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
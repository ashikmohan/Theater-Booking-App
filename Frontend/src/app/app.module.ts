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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { UserdashboardComponent } from './User/userdashboard/userdashboard.component';

import { AddmoviesComponent } from './Admin/addmovies/addmovies.component';
import { MoviefetchedComponent } from './Admin/moviefetched/moviefetched.component';
import { AddmovieService } from './addmovie.service';
import { CommonModule } from '@angular/common';
import { UsermoviefetchedComponent } from './User/usermoviefetched/usermoviefetched.component';
import { MoviedetailsComponent } from './User/moviedetails/moviedetails.component';
import { MoviefetchingService } from './moviefetching.service';
import { EditComponent } from './Admin/edit/edit.component';
import { RatingService } from './rating.service';
import { TicketbokkingComponent } from './User/ticketbokking/ticketbokking.component';
import { TicketsComponent } from './Admin/tickets/tickets.component';
import { MyticketsComponent } from './User/mytickets/mytickets.component';
import { BookingService } from './booking.service';
import { TokeninterceptorService } from './tokeninterceptor.service';
import { adminGuard } from './admin.guard';
import { AboutUsComponent } from './homepage/about-us/about-us.component';
import { SearchPipe } from './search.pipe';


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
    AddmoviesComponent,
    MoviefetchedComponent,
    UsermoviefetchedComponent,
    MoviedetailsComponent,
    EditComponent,
    TicketbokkingComponent,
    TicketsComponent,
    MyticketsComponent,
    AboutUsComponent,
    SearchPipe,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    
    
    
    
  

  ],
  providers: [AuthserveService,
    AddmovieService,
    MoviefetchingService,
    RatingService,
    BookingService,
    {
    provide:HTTP_INTERCEPTORS,
    useClass:TokeninterceptorService,
    multi:true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }

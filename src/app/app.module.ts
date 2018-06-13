import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http'
//import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MainComponent } from "./main/main.component";
import { HomeModule } from './home/home.module';
import { NavbarService } from "./service/navbar.service";
import { PromptpayComponent } from "./promptpay/promptpay.component";
import { AccountComponent} from "./account/account.component";
import { Routes, RouterModule } from '@angular/router';
import { MoneyTranferComponent} from './money-tranfer/money-tranfer.component';
import { UserService } from "./service/data.service";
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user-profile', component: ProfileComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'landing', component: LandingComponent },
  // { path: 'nucleoicons', component: NucleoiconsComponent },
  { path: 'promptpay', component: PromptpayComponent },
  { path: 'main', component: MainComponent },
  { path: 'account',component:AccountComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    MainComponent,
    PromptpayComponent,
    AccountComponent,
    MoneyTranferComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  providers: [NavbarService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

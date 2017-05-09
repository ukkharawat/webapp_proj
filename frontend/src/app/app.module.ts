import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router'
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CollapseModule  } from 'ngx-bootstrap'
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { CustExtBrowserXhrService } from './services/cust-ext-browser-xhr.service';
import { AuthService } from './services/auth.service'

const appRoutes: Routes = [ 
  {path:'', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'register' , component: RegisterComponent}
]
 

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RegisterComponent,
    FileSelectDirective,
    FileDropDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CollapseModule.forRoot(),
    FlashMessagesModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    CustExtBrowserXhrService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

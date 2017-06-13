import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router'
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { ColorPickerModule } from 'angular2-color-picker';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CollapseModule } from 'ngx-bootstrap'
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { CustExtBrowserXhrService } from './services/cust-ext-browser-xhr.service';
import { AuthService } from './services/auth.service'
import { ValidateService } from './services/validate.service'
import { CosmeticService } from './services/cosmetic.service'
import { ReviewService } from './services/review.service'
import { AuthGuard } from './guards/auth.guard';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResetComponent } from './components/reset/reset.component';
import { ResetConfirmComponent } from './components/reset-confirm/reset-confirm.component';
import { CosmeticComponent } from './components/cosmetic/cosmetic.component';
import { AddCosmeticComponent } from './components/add-cosmetic/add-cosmetic.component';
import { EditCosmeticComponent } from './components/edit-cosmetic/edit-cosmetic.component';
import { DetailComponent } from './components/detail/detail.component';
import { BrandComponent } from './components/brand/brand.component';
import { SearchComponent } from './components/search/search.component'

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'wishlist', component: WishlistComponent , canActivate:[AuthGuard]},
  { path: 'profile' , component : ProfileComponent , canActivate:[AuthGuard]},
  { path: 'add' , component : AddCosmeticComponent , canActivate:[AuthGuard]},
  { path: 'edit/:id' , component : EditCosmeticComponent , canActivate:[AuthGuard]},
  { path: 'reset' , component : ResetComponent},
  { path: 'resetConfirm/:username' , component : ResetConfirmComponent},
  { path: 'cosmetic/:category' , component : CosmeticComponent},
  { path: 'brand/:brand' , component: BrandComponent},
  { path: 'detail/:id' , component: DetailComponent}
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
    FileDropDirective,
    WishlistComponent,
    ProfileComponent,
    ResetComponent,
    ResetConfirmComponent,
    CosmeticComponent,
    AddCosmeticComponent,
    EditCosmeticComponent,
    DetailComponent,
    BrandComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CollapseModule.forRoot(),
    FlashMessagesModule,
    RouterModule.forRoot(appRoutes),
    ColorPickerModule
  ],
  providers: [
    CustExtBrowserXhrService,
    AuthService,
    AuthGuard,
    ValidateService,
    CosmeticService,
    ReviewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

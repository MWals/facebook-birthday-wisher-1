import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SettingsComponent } from './settings/settings.component';
import {AccordionModule} from "ngx-accordion";
import { RequestComponent } from './request/request.component';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RequestService} from "./request/request.service";
import {CustomFormsModule} from "ng2-validation";
import { AlertModule } from 'ngx-bootstrap/alert';
import {MomentModule} from "angular2-moment";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'request', component: RequestComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    HeaderComponent,
    SettingsComponent,
    RequestComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true }),
    BrowserModule,
    AccordionModule,
    FormsModule,
    HttpModule,
    CustomFormsModule,
    AlertModule.forRoot(),
    MomentModule
  ],
  providers: [RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }

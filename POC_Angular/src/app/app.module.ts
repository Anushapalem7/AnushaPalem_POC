import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthorComponent } from './author/author.component';
import { ReaderComponent } from './reader/reader.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app.material-module';
import { GridUIModule } from './utilites/grid-ui/grid-ui.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthorComponent,
    ReaderComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
     GridUIModule,
     HttpClientModule,
    RouterModule.forRoot([{path:"login", component:LoginComponent},{path:"", component:LoginComponent},{path:'author', component:AuthorComponent},{path:'reader', component:ReaderComponent},{path:'author/logout', component:LoginComponent},{path:'reader/logout', component:LoginComponent}]),
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

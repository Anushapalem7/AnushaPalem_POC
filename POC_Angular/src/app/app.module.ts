import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthorComponent } from './author/author.component';
import { ReaderComponent } from './reader/reader.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthorComponent,
    ReaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([{path:"", component:LoginComponent},{path:'author', component:AuthorComponent},{path:'reader', component:ReaderComponent}])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

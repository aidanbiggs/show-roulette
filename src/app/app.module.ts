import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { HttpClientModule } from '@angular/common/http';
import { SingleShowModule } from './single-show/single-show.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,

  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      SingleShowModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { HttpClientModule } from '@angular/common/http';
import { SingleShowModule } from './home-screen/single-show/single-show.module';
import { FilterShowsComponent } from './home-screen/filter-shows/filter-shows.component';
import { ShowSpinnerComponent } from './home-screen/show-spinner/show-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    FilterShowsComponent,
    ShowSpinnerComponent,

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

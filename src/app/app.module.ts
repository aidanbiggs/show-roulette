import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RandomShowGenerateService } from './home-screen/random-show-generate.service';
import { HomeScreenModule } from './home-screen/home-screen.module';
import { SharedModule } from './shared/shared-module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HomeScreenModule,
        CommonModule,
        SharedModule
    ],
    providers: [
        RandomShowGenerateService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

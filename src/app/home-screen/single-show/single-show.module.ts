import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SingleShowComponent} from './single-show.component';
import {FilterShowsModule} from '../filter-shows/filter-shows.module';
import {SingleShowService} from './single-show.service';

@NgModule({
    imports: [
        CommonModule,
        FilterShowsModule
    ],
    declarations: [
        SingleShowComponent
    ],
    exports: [
        SingleShowComponent
    ],
    providers: [
        SingleShowService
    ],
})
export class SingleShowModule { }

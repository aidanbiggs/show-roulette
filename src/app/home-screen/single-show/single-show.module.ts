import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SingleShowService} from './single-show.service';
import {SingleShowComponent} from './single-show.component';

@NgModule({
    imports: [
        CommonModule
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

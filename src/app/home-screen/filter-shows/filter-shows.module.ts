import { NgModule } from '@angular/core';

import { FilterShowsComponent } from './filter-shows.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [ReactiveFormsModule, CommonModule],
    exports: [FilterShowsComponent],
    declarations: [FilterShowsComponent],
    providers: [],
})
export class FilterShowsModule {
}

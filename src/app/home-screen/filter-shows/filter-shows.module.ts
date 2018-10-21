import {NgModule} from '@angular/core';

import {FilterShowsComponent} from './filter-shows.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [ReactiveFormsModule],
    exports: [FilterShowsComponent],
    declarations: [FilterShowsComponent],
    providers: [],
})
export class FilterShowsModule {
}

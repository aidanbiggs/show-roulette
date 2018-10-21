import {NgModule} from '@angular/core';

import {HomeScreenComponent} from './home-screen.component';
import {FilterShowsModule} from './filter-shows/filter-shows.module';
import {ShowSpinnerModule} from './show-spinner/show-spinner.module';
import {SingleShowModule} from './single-show/single-show.module';

@NgModule({
    imports: [FilterShowsModule, ShowSpinnerModule, SingleShowModule],
    exports: [HomeScreenComponent],
    declarations: [HomeScreenComponent],
    providers: [],
})
export class HomeScreenModule {
}

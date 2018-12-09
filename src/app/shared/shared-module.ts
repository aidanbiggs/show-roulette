import { NgModule } from '@angular/core';
import { FilterOptionsMapperService } from './filter-options/filter-options.mapper.service';
import { FilterOptionsApiService } from './filter-options/filter-options.api.service';
import { DiscoverApiService } from './discover/discover.service.api';
import {DiscoverMapperService} from './discover/discover.mapper.service';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        FilterOptionsMapperService,
        FilterOptionsApiService,
        DiscoverApiService,
        DiscoverMapperService
    ],
})
export class SharedModule {
}

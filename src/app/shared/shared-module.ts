import { NgModule } from '@angular/core';
import { FilterOptionsMapperService } from './filter-options/filter-options.mapper.service';
import { FilterOptionsApiService } from './filter-options/filter-options.api.service';
import { DiscoverApiService } from './discover/discover.service.api';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        FilterOptionsMapperService,
        FilterOptionsApiService,
        DiscoverApiService
    ],
})
export class SharedModule {
}

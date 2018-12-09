import { Injectable } from '@angular/core';
import { IFilterFormGroups } from '../../home-screen/filter-shows/filter-shows.component';
import { FilterOptionsMapperService } from '../filter-options/filter-options.mapper.service';

@Injectable()
export class DiscoverApiService {
    private _filterOptionsMapperService: FilterOptionsMapperService;

    constructor(filterOptionsMapperService: FilterOptionsMapperService) {
        this._filterOptionsMapperService = filterOptionsMapperService;
    }

    public getDiscoverMovies(movieFilters: IFilterFormGroups) {
        this._filterOptionsMapperService.mapMovieFilters(movieFilters);
    }
}

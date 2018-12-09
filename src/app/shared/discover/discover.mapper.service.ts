import { Injectable } from '@angular/core';
import { GenreType } from '../types/genre.type';
import { LanguageType } from '../types/language.type';
import { IFilterFormGroups } from '../../home-screen/filter-shows/filter-shows.component';
import {DiscoverHeaderType} from '../types/discover-header.type';

@Injectable()
export class DiscoverMapperService {

    constructor() {
    }

    public mapDiscoverHeader(data: any): DiscoverHeaderType {
        return {
            totalPages: data.total_pages,
            totalResults: data.total_results
        };
    }

    public mapDiscoverMovie(data: any) {

    }
}

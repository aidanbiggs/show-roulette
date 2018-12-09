import { Injectable } from '@angular/core';
import { IFilterFormGroups } from '../../home-screen/filter-shows/filter-shows.component';
import { FilterOptionsMapperService } from '../filter-options/filter-options.mapper.service';
import {AppConstants} from '../../app.consts';
import {flatMap, map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DiscoverHeaderType} from '../types/discover-header.type';
import {DiscoverMapperService} from './discover.mapper.service';
import {NumberGeneratorService} from '../number-generator.service';

@Injectable()
export class DiscoverApiService {
    private _filterOptionsMapperService: FilterOptionsMapperService;
    private _httpClient: HttpClient;
    private _discoverMapperService: DiscoverMapperService;
    private _numberGeneratorService: NumberGeneratorService;


    constructor(filterOptionsMapperService: FilterOptionsMapperService, httpClient: HttpClient, discoverMapperService: DiscoverMapperService, numberGeneratorService: NumberGeneratorService) {
        this._filterOptionsMapperService = filterOptionsMapperService;
        this._httpClient = httpClient;
        this._discoverMapperService = discoverMapperService;
        this._numberGeneratorService = numberGeneratorService;
    }

    public getDiscoverHeader(): Observable<DiscoverHeaderType> {
        return this._httpClient.get(`https://api.themoviedb.org/3/discover/movie?api_key=${AppConstants.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
            .pipe(
                map((response) => this._discoverMapperService.mapDiscoverHeader(response))
            );
    }

    public getDiscoverMoviesRandom(movieFilters: IFilterFormGroups) {
        this.getDiscoverHeader().pipe(
            map((headerRes) => {
                return this._numberGeneratorService.randomNumberBetween(0, headerRes.totalPages);
            })).subscribe((response) => {
                this.getDiscoverMovie(response);
            });
        // this._filterOptionsMapperService.mapMovieFilters(movieFilters);
    }

    public getDiscoverMovie(page: number) {
        console.log(page);
        console.log(`https://api.themoviedb.org/3/discover/movie?api_key=${AppConstants.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`);
        return this._httpClient.get(`https://api.themoviedb.org/3/discover/movie?api_key=${AppConstants.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)
            .pipe(
                tap((urlResponse) => {
                        console.log(urlResponse);
                        return 1;
                    }
                ));
    }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenreType } from '../types/genre.type';
import { AppConstants } from '../../app.consts';
import { map } from 'rxjs/operators';
import { FilterOptionsMapperService } from './filter-options.mapper.service';
import { HttpClient } from '@angular/common/http';
import { LanguageType } from '../types/language.type';

@Injectable()
export class FilterOptionsApiService {
    private _filterOptionsMapperService: FilterOptionsMapperService;
    private _httpClient: HttpClient;

    constructor(httpClient: HttpClient, filterOptionsMapperService: FilterOptionsMapperService) {
        this._filterOptionsMapperService = filterOptionsMapperService;
        this._httpClient = httpClient;
    }

    public getMovieGenres(): Observable<Array<GenreType>> {
        return this._httpClient.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${AppConstants.API_KEY}`)
            .pipe(
                map((response) => this._filterOptionsMapperService.mapMovieGenres(response))
            );
    }

    public getLanguages(): Observable<Array<LanguageType>> {
        return this._httpClient.get(`https://api.themoviedb.org/3/configuration/languages?api_key=${AppConstants.API_KEY}`)
            .pipe(
                map((response) => this._filterOptionsMapperService.mapLanguages(response))
            );
    }
}

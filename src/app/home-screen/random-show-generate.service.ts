import {Injectable} from '@angular/core';
import {AppConstants} from '../app.consts';
import {map} from 'rxjs/operators';
import {forkJoin, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SingleShowType} from './single-show/single-show.type';
import {SingleShowService} from './single-show/single-show.service';

@Injectable()
export class RandomShowGenerateService {
    private _httpClient: HttpClient;
    private _singleShowService: SingleShowService;

    constructor(httpClient: HttpClient, singleShowService: SingleShowService) {
        this._httpClient = httpClient;
        this._singleShowService = singleShowService;
    }

    public getShows(numberOfMovies, latestMovieId, latestSeriesId): Observable<Array<SingleShowType>> {
        const shows: Array<SingleShowType> = [];
        const calls = [];

        for (let i = 0; i < AppConstants.NUMBER_OF_SHOWS; i++) {
            if (i < numberOfMovies) {
                calls.push(this._singleShowService.getValidMovie(latestMovieId));
            } else {
                calls.push(this._singleShowService.getValidSeries(latestSeriesId));
            }
        }
        return forkJoin(...calls).pipe(
            map((data) => {
                if (data !== null) {
                    data = data.map( e => {
                        return this._singleShowService.mapSingleShowType(e);
                    });
                    shows.push(...data);
                }
                return shows;
            })
        );
    }
}

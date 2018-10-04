import {Injectable} from '@angular/core';
import {SingleMovieType} from './single-show/single-movie.type';
import {AppConstants} from '../app.consts';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SingleShowService} from './single-show/single-show.service';
import {SingleTvType} from './single-show/single-tv.type';

@Injectable()
export class RandomShowGenerateService {
    private _httpClient: HttpClient;
    private _singleShowService: SingleShowService;

    constructor(httpClient: HttpClient, singleShowService: SingleShowService) {
        this._httpClient = httpClient;
        this._singleShowService = singleShowService;
    }

    public getLatestMovie(): Observable<SingleMovieType> {
        return this._httpClient.get(`https://api.themoviedb.org/3/movie/latest?api_key=${AppConstants.API_KEY}`).pipe(
            map((response) => this._singleShowService.mapSingleMovie(response)
            )
        );
    }

    public getLatestTv(): Observable<SingleTvType> {
        return this._httpClient.get(`https://api.themoviedb.org/3/tv/latest?api_key=${AppConstants.API_KEY}`).pipe(
            map((response) => this._singleShowService.mapSingleTv(response)
            )
        );
    }
}

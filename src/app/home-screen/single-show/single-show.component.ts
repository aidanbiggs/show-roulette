import {Component, OnInit} from '@angular/core';
import {SingleShowService} from './single-show.service';
import {SingleMovieType} from './single-movie.type';
import {RandomShowGenerateService} from '../random-show-generate.service';
import {mergeMap} from 'rxjs/operators';
import {SingleTvType} from './single-tv.type';
import {forkJoin, Observable} from 'rxjs';
import {SingleShowType} from './single-show.type';
import {AppConstants} from '../../app.consts';

@Component({
    selector: 'app-single-show',
    templateUrl: './single-show.component.html',
    styleUrls: ['./single-show.component.scss']
})
export class SingleShowComponent implements OnInit {
    public latestMovie: Observable<SingleMovieType>;
    public latestTv: Observable<SingleTvType>;

    private showIds: Array<SingleShowType> = [];
    private _singleShowService: SingleShowService;
    private _randomShowGenerateService: RandomShowGenerateService;

    constructor(singleShowService: SingleShowService, randomShowGenerateService: RandomShowGenerateService) {
        this._singleShowService = singleShowService;
        this._randomShowGenerateService = randomShowGenerateService;
    }

    ngOnInit() {
        this.latestMovie = this._randomShowGenerateService.getLatestMovie().pipe(
            mergeMap((value) => {
                return this._singleShowService.getSingleMovie(value.id);
            })
        );

        this.latestTv = this._randomShowGenerateService.getLatestTv().pipe(
            mergeMap((value) => {
                return this._singleShowService.getSingleTv(value.id);
            })
        );

        forkJoin([this.latestMovie, this.latestTv]).subscribe(results => {
            const latestMovieId = results[0].id;
            const latestSeriesId = results[1].id;
            const numberOfMovies = this.randomNumberBetween(0, 10);
            const idArray: Array<number> = [];
            this.getShowIds(numberOfMovies, latestMovieId, latestSeriesId, idArray);
        });
    }

    private getShowIds(numberOfMovies, latestMovieId, latestSeriesId, idArray: Array<number>) {
        const calls = [];

        for (let i = 0; i < AppConstants.NUMBER_OF_SHOWS; i++) {
            if (i < numberOfMovies) {
                calls.push(this._singleShowService.getValidMovie(latestMovieId));
            } else {
                calls.push(this._singleShowService.getValidSeries(latestSeriesId));
            }
        }
        forkJoin(...calls).subscribe((data) => {
            if (data !== null) {
                idArray.push(...data);
            }
            console.log(idArray);
        });
    }

    public randomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

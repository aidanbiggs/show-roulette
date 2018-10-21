import {Component, OnInit} from '@angular/core';
import {SingleShowService} from './single-show.service';
import {RandomShowGenerateService} from '../random-show-generate.service';
import {map, mergeMap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {SingleShowType} from './single-show.type';

@Component({
    selector: 'app-single-show',
    templateUrl: './single-show.component.html',
    styleUrls: ['./single-show.component.scss']
})
export class SingleShowComponent implements OnInit {
    public shows: Array<SingleShowType>;
    private _singleShowService: SingleShowService;
    private _randomShowGenerateService: RandomShowGenerateService;

    constructor(singleShowService: SingleShowService, randomShowGenerateService: RandomShowGenerateService) {
        this._singleShowService = singleShowService;
        this._randomShowGenerateService = randomShowGenerateService;
    }

    ngOnInit() {
        const latestMovie = this._singleShowService.getLatestMovie().pipe(
            mergeMap((value) => {
                return this._singleShowService.getSingleMovie(value.id);
            })
        );

        const latestSeries = this._singleShowService.getLatestTv().pipe(
            mergeMap((value) => {
                return this._singleShowService.getSingleTv(value.id);
            })
        );

        forkJoin([latestMovie, latestSeries]).subscribe(results => {
            const latestMovieId = results[0].id;
            const latestSeriesId = results[1].id;
            const numberOfMovies = this.randomNumberBetween(0, 10);

            this._randomShowGenerateService.getShows(numberOfMovies, latestMovieId, latestSeriesId).pipe(map((result) => {
                this.shows = result;
            })).subscribe();
        });
    }


    public randomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

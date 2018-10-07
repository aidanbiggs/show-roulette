import {Component, OnInit} from '@angular/core';
import {SingleShowService} from './single-show.service';
import {SingleMovieType} from './single-movie.type';
import {RandomShowGenerateService} from '../random-show-generate.service';
import {mergeMap} from 'rxjs/operators';
import {SingleTvType} from './single-tv.type';

@Component({
    selector: 'app-single-show',
    templateUrl: './single-show.component.html',
    styleUrls: ['./single-show.component.scss']
})
export class SingleShowComponent implements OnInit {
    public latestMovie: SingleMovieType;
    public latestTv: SingleTvType;
    private randomFilmId: number;

        private _singleShowService: SingleShowService;
    private _randomShowGenerateService: RandomShowGenerateService;

    constructor(singleShowService: SingleShowService, randomShowGenerateService: RandomShowGenerateService) {
        this._singleShowService = singleShowService;
        this._randomShowGenerateService = randomShowGenerateService;
    }

    ngOnInit() {
        this._randomShowGenerateService.getLatestMovie().pipe(
            mergeMap((value) => {
                return this._singleShowService.getSingleMovie(value.id);
            })
        ).subscribe(value => {
            this.latestMovie = value;
            this.randomFilmId = this.randomNumberBetween(0, this.latestMovie.id);
        });

        this._randomShowGenerateService.getLatestTv().pipe(
            mergeMap((value) => {
                return this._singleShowService.getSingleTv(value.id);
            })
        ).subscribe(value => {
            this.latestTv = value;
        });

        const numberOfMovies = this.randomNumberBetween(0, 10);
        const numberOfSeries = 10 - numberOfMovies;
        console.log(this.randomFilmId);


    }

    private randomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

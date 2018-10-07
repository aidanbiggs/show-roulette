import {Component, OnInit} from '@angular/core';
import {SingleShowService} from './single-show.service';
import {SingleMovieType} from './single-movie.type';
import {RandomShowGenerateService} from '../random-show-generate.service';
import {mergeMap} from 'rxjs/operators';
import {SingleTvType} from './single-tv.type';
import {forkJoin, Observable} from 'rxjs';

@Component({
    selector: 'app-single-show',
    templateUrl: './single-show.component.html',
    styleUrls: ['./single-show.component.scss']
})
export class SingleShowComponent implements OnInit {
    public latestMovie: Observable<SingleMovieType>;
    public latestTv: Observable<SingleTvType>;

    private showIds: number[] = [];
    private randomFilmId: number;
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
            const latestMovieId = results[0];
            const latestTvId = results[1];
            const numberOfMovies = this.randomNumberBetween(0, 10);
            let randomMovieId;
            let randomTvId;

            for (let i = 0; this.showIds.length < numberOfMovies;) {
                randomMovieId = this.randomNumberBetween(0, latestMovieId);

                if (!this.showIds.includes(randomMovieId)) {
                    this.showIds[i] = this.randomNumberBetween(0, latestMovieId);
                    i++;
                }
            }

            for (let j = numberOfMovies; this.showIds.length < 10;) {
                randomTvId = this.randomNumberBetween(0, latestTvId);

                if (!this.showIds.includes(randomTvId)) {
                    this.showIds[j] = this.randomNumberBetween(0, latestTvId);
                    j++;
                }
            }
        });
        console.log('dicks');
    }

    private randomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

import {Component, OnInit} from '@angular/core';
import {SingleShowService} from './single-show.service';
import {SingleMovieType} from './single-movie.type';
import {RandomShowGenerateService} from '../random-show-generate.service';
import {mergeMap} from 'rxjs/operators';
import {SingleTvType} from './single-tv.type';
import {forkJoin, Observable} from 'rxjs';
import {SingleShowType} from './single-show.type';

@Component({
    selector: 'app-single-show',
    templateUrl: './single-show.component.html',
    styleUrls: ['./single-show.component.scss']
})
export class SingleShowComponent implements OnInit {
    public latestMovie: Observable<SingleMovieType>;
    public latestTv: Observable<SingleTvType>;

    private showIds: Array <SingleShowType> = [];
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
            const latestTvId = results[1].id;
            const numberOfMovies = this.randomNumberBetween(0, 10);
            let randomMovieId;
            let randomTvId;

            for (let i = 0; this.showIds.length < numberOfMovies;) {
                randomMovieId = this.randomNumberBetween(0, latestMovieId);

                if (!this.showIds.includes(randomMovieId)) {
                    this._singleShowService.urlExists(randomMovieId).subscribe(data => {
                        console.log('Hi Bethan', data);
                    });
                    if (this._singleShowService.urlExists(randomMovieId)) {
                        this.showIds[i] = {
                            id: randomMovieId, isMovie: true
                        };
                        i++;
                    }
                }
            }

            console.log('showIds = ', this.showIds.length);
            console.log(' numberOfMovies= ', numberOfMovies);

            for (let j = numberOfMovies; this.showIds.length < 10;) {
                randomTvId = this.randomNumberBetween(0, latestTvId);
                if (!this.showIds.includes(randomTvId)) {
                    this.showIds[j] = {
                        id: this.randomNumberBetween(0, latestTvId),  isMovie: false
                    };
                    j++;
                }
            }
        });
    }

    private randomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

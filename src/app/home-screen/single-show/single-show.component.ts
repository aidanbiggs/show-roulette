import {Component, OnInit} from '@angular/core';
import {SingleShowService} from './single-show.service';
import {SingleMovieType} from './single-movie.type';
import {RandomShowGenerateService} from '../random-show-generate.service';
import {mergeMap, takeUntil, takeWhile} from 'rxjs/operators';
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
            const latestTvId = results[1].id;
            const numberOfMovies = this.randomNumberBetween(0, 10);
            let idArray: Array<number> = [];
            // for (let i = 0; i < numberOfMovies) {
            this._singleShowService.urlExists(latestMovieId).pipe(takeWhile(() => idArray.length < 10))
                .subscribe((data) => {
                    if (data !== -1 && idArray.length !== 10) {
                        idArray.push(data);
                    }
                });
            //
            // let notifier: Observable<any>
            // let currentIndex = 0;
            //
            // this._singleShowService.urlExists(latestMovieId).pipe(takeUntil(notifier)).subscribe(data => {
            //     if (this.showIds.length === 10) {
            //         if (!isNaN(data)) {
            //             console.log('data = ', data);
            //             this.showIds[currentIndex] = {
            //                 id: data, isMovie: true
            //             };
            //             currentIndex++;
            //         }
            //     }
            // });
            // if (this._singleShowService.urlExists(randomMovieId)) {
            //     this.showIds[i] = {
            //         id: randomMovieId, isMovie: true
            //     };
            //     i++;
            // }

        });
    }

    public randomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

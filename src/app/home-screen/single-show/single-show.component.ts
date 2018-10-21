import {Component, OnInit} from '@angular/core';
import {SingleShowService} from './single-show.service';
import {RandomShowGenerateService} from '../random-show-generate.service';
import {map} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {SingleShowType} from './single-show.type';
import {AppConstants} from '../../app.consts';

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
    }

    public populateShows(formValue: any) {
        const numberOfMovies = this.getNumberOfMoviesFromFilter(formValue);
        const latestMovie = this._singleShowService.getLatestMovie();
        const latestSeries = this._singleShowService.getLatestTv();

        forkJoin([latestMovie, latestSeries]).subscribe(results => {
            const latestMovieId = results[0].id;
            const latestSeriesId = results[1].id;


            this._randomShowGenerateService.getShows(numberOfMovies, latestMovieId, latestSeriesId).pipe(map((result) => {
                this.shows = result;
            })).subscribe();
        });
    }

    private getNumberOfMoviesFromFilter(formValue: any) {
        let numberOfMovies: number;

        if (formValue.movieCheck && formValue.tvCheck) {
            numberOfMovies = this.randomNumberBetween(0, AppConstants.NUMBER_OF_SHOWS);
        } else if (formValue.movieCheck) {
            numberOfMovies = AppConstants.NUMBER_OF_SHOWS;
        } else if (formValue.tvCheck) {
            numberOfMovies = 0;
        } else {
            numberOfMovies = this.randomNumberBetween(0, AppConstants.NUMBER_OF_SHOWS);
        }

        return numberOfMovies;
    }

    private randomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

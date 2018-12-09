import {Component, OnInit} from '@angular/core';
import {NumberGeneratorService} from '../../shared/number-generator.service';
import {RandomShowGenerateService} from '../random-show-generate.service';
import {map} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {SingleShowType} from './single-show.type';
import {AppConstants} from '../../app.consts';
import {SingleShowService} from './single-show.service';

@Component({
    selector: 'app-single-show',
    templateUrl: './single-show.component.html',
    styleUrls: ['./single-show.component.scss']
})
export class SingleShowComponent implements OnInit {
    public shows: Array<SingleShowType>;
    private _singleShowService: SingleShowService;
    private _randomShowGenerateService: RandomShowGenerateService;
    private _numberGeneratorService: NumberGeneratorService;

    constructor(singleShowService: SingleShowService, randomShowGenerateService: RandomShowGenerateService, numberGeneratorService: NumberGeneratorService) {
        this._singleShowService = singleShowService;
        this._randomShowGenerateService = randomShowGenerateService;
        this._numberGeneratorService = numberGeneratorService;
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
            numberOfMovies = this._numberGeneratorService.randomNumberBetween(0, AppConstants.NUMBER_OF_SHOWS);
        } else if (formValue.movieCheck) {
            numberOfMovies = AppConstants.NUMBER_OF_SHOWS;
        } else if (formValue.tvCheck) {
            numberOfMovies = 0;
        } else {
            numberOfMovies = this._numberGeneratorService.randomNumberBetween(0, AppConstants.NUMBER_OF_SHOWS);
        }

        return numberOfMovies;
    }
}

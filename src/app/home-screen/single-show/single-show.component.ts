import {Component, OnInit} from '@angular/core';
import {SingleShowService} from './single-show.service';
import {SingleMovieType} from './single-movie.type';
import {RandomShowGenerateService} from '../random-show-generate.service';
import {map, mergeMap} from 'rxjs/operators';

@Component({
    selector: 'app-single-show',
    templateUrl: './single-show.component.html',
    styleUrls: ['./single-show.component.scss']
})
export class SingleShowComponent implements OnInit {
    public singleShow: SingleMovieType;

    private _singleShowService: SingleShowService;
    private _randomShowGenerateService: RandomShowGenerateService;

    constructor(singleShowService: SingleShowService, randomShowGenerateService: RandomShowGenerateService) {
        this._singleShowService = singleShowService;
        this._randomShowGenerateService = randomShowGenerateService;
    }

    ngOnInit() {
        const latestMovieId = this._randomShowGenerateService.getLatestMovie().subscribe(mergeMap((data) => {
            return data.id;
        }));
        this._singleShowService.getSingleMovie(latestMovieId).subscribe(result => {
            this.singleShow = result;
        });
    }
}

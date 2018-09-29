import {Component, OnInit} from '@angular/core';
import {SingleShowService} from './single-show.service';
import {SingleShowType} from './single-show.type';

@Component({
    selector: 'app-single-show',
    templateUrl: './single-show.component.html',
    styleUrls: ['./single-show.component.css']
})
export class SingleShowComponent implements OnInit {
    public singleShow: SingleShowType;

    private _singleShowService: SingleShowService;

    constructor(singleShowService: SingleShowService) {
        this._singleShowService = singleShowService;
    }

    ngOnInit() {
        this._singleShowService.getSingleShow().subscribe(result => {
            this.singleShow = result;
        });
    }
}

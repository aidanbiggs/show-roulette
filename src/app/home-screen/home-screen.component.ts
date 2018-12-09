import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterShowsComponent } from './filter-shows/filter-shows.component';
import { SingleShowComponent } from './single-show/single-show.component';
import { DiscoverApiService } from '../shared/discover/discover.service.api';

@Component({
    selector: 'app-home-screen',
    templateUrl: './home-screen.component.html',
    styleUrls: ['./home-screen.component.scss']
})

export class HomeScreenComponent implements OnInit {
    @ViewChild(FilterShowsComponent) filterShowsComponent: FilterShowsComponent;
    @ViewChild(SingleShowComponent) singleShowComponent: SingleShowComponent;
    private _discoverApiService: DiscoverApiService;

    constructor(discoverApiService: DiscoverApiService) {
        this._discoverApiService = discoverApiService;

    }

    ngOnInit() {

    }

    public onSpinButtonClicked() {
        this._discoverApiService.getDiscoverMovies(this.filterShowsComponent.getForms());
        this.singleShowComponent.populateShows(this.filterShowsComponent.showTypeForm.value);
    }


}

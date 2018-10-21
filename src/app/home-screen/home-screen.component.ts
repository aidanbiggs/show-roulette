import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FilterShowsComponent} from './filter-shows/filter-shows.component';
import {SingleShowComponent} from './single-show/single-show.component';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})

export class HomeScreenComponent implements OnInit {
    @ViewChild(FilterShowsComponent) filterShowsComponent: FilterShowsComponent;
    @ViewChild(SingleShowComponent) singleShowComponent: SingleShowComponent;

  constructor() {
  }

  ngOnInit() {
  }

  public onSpinButtonClicked() {
      this.singleShowComponent.populateShows(this.filterShowsComponent.filterForm.value);
  }

}

import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FilterShowsComponent} from './filter-shows/filter-shows.component';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})

export class HomeScreenComponent implements OnInit {
    @ViewChild(FilterShowsComponent) filterShowsComponent: FilterShowsComponent;

  constructor() {
  }

  ngOnInit() {
  }

  public onSpinButtonClicked() {
      console.log(this.filterShowsComponent.filterForm.value);
      console.log('hello');
  }

}

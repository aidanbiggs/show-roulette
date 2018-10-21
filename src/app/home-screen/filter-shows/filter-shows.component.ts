import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-filter-shows',
    templateUrl: './filter-shows.component.html',
    styleUrls: ['./filter-shows.component.css'],
    providers: []
})

export class FilterShowsComponent implements OnInit {
    public filterForm = new FormGroup({
        movieCheck: new FormControl(false),
        tvCheck: new FormControl(false),
    });

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterOptionsApiService } from '../../shared/filter-options/filter-options.api.service';
import { tap } from 'rxjs/operators';
import {GenreType} from '../../shared/types/genre.type';

@Component({
    selector: 'app-filter-shows',
    templateUrl: './filter-shows.component.html',
    styleUrls: ['./filter-shows.component.css'],
    providers: []
})

export class FilterShowsComponent implements OnInit {
    public showTypeForm = new FormGroup({
        movieCheck: new FormControl(false),
        tvCheck: new FormControl(false),
    });

    public genresArray: Array<GenreType> = [];
    public languagesArray: Array<string> = [];
    public genreForm = new FormGroup({});
    public languageForm = new FormGroup({});
    public toggleFilters = false;
    public toggleGenreSection = false;
    public toggleLanguageSection = false;

    private _filterOptionsService: FilterOptionsApiService;
    private _allFilters: IFilterFormGroups;

    constructor(filterOptionsService: FilterOptionsApiService) {
        this._filterOptionsService = filterOptionsService;
    }

    ngOnInit() {

        this._filterOptionsService.getMovieGenres().pipe(
            tap((genres) => {
                genres.forEach((genre) => {
                    this.genreForm.addControl(genre.id.toString(), new FormControl(false));
                    this.genresArray = this.genresArray.concat(genre);
                });
            })
        ).subscribe();

        this._filterOptionsService.getLanguages().pipe(
            tap((languages) => {
                languages.forEach((language) => {
                    this.languageForm.addControl(language.languageName, new FormControl(false));
                    this.languagesArray = this.languagesArray.concat(language.languageName);
                });
            })
        ).subscribe();

    }

    public toggleAdditionalFilters(): void {
        this.toggleFilters = !this.toggleFilters;
    }

    public toggleGenres(): void {
        this.toggleGenreSection = !this.toggleGenreSection;
    }

    public toggleLanguages(): void {
        this.toggleLanguageSection = !this.toggleLanguageSection;
    }

    public getForms(): IFilterFormGroups {
        return this._allFilters = {
            genreFormGroup: this.genreForm,
            languageFormGroup: this.languageForm,
            showTypeFormGroup: this.showTypeForm
        };
    }
}

export interface IFilterFormGroups {
    languageFormGroup: FormGroup;
    genreFormGroup: FormGroup;
    showTypeFormGroup: FormGroup;
}

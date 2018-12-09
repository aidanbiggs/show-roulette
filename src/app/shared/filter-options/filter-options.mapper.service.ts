import { Injectable } from '@angular/core';
import { GenreType } from '../types/genre.type';
import { LanguageType } from '../types/language.type';
import { IFilterFormGroups } from '../../home-screen/filter-shows/filter-shows.component';

@Injectable()
export class FilterOptionsMapperService {

    constructor() {
    }

    public mapLanguages(data: any): Array<LanguageType> {
        const languageArray = [];
        data.forEach((genre) => {
            languageArray.push(this.mapLanguage(genre));
        });
        return languageArray;
    }

    public mapLanguage(data: any): LanguageType {
        return {
            isoName: data.iso_639_1,
            languageName: data.english_name
        };
    }

    public mapMovieGenres(data: any): Array<GenreType> {
        const genreArray = [];
        data.genres.forEach((genre) => {
            genreArray.push(this.mapMovieGenre(genre));
        });
        return genreArray;
    }

    public mapMovieGenre(data: any): GenreType {
        return {
            id: data.id,
            name: data.name
        };
    }

    public mapMovieFilters(filters: IFilterFormGroups) {
        this.mapMovieFiltersGenre(filters.genreFormGroup);
    }

    public mapMovieFiltersGenre(genreFormGroup) {
        for (const genres in genreFormGroup.value) {
            if (!genreFormGroup.value.hasOwnProperty(genres)) {
                continue;
            }
            const key = genres;
            const value = genreFormGroup.value[genres];

            console.log('key is ' + key + ' value is ' + value);
        }

    }
}

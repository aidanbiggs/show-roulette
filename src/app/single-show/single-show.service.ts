import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SingleShowType} from './single-show.type';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SingleShowService {
    public readonly singleShow: SingleShowType = new SingleShowType;

    private _httpClient: HttpClient;
    private readonly API_KEY = '3143003947dc0fba45fca27767e5f5fc';

    constructor(httpClient: HttpClient) {
        this._httpClient = httpClient;
    }

    public getSingleShow(): Observable<SingleShowType> {
        return this._httpClient.get(`https://api.themoviedb.org/3/movie/343611?api_key=${this.API_KEY}`)
            .pipe(
                map((response) => this.mapSingleShow(response)
                )
            );
    }

    public mapSingleShow(data: any): SingleShowType {

        this.singleShow.adult = data.adult;
        this.singleShow.backdropPath = data.backdrop_path;
        this.singleShow.belongsToCollection = {};
        this.singleShow.budget = data.budget;
        this.singleShow.genres = ['test1'];
        this.singleShow.homepage = data.homepage;
        this.singleShow.id = data.id;
        this.singleShow.imdbId = data.imdb_id;
        this.singleShow.originalLanguage = data.original_language;
        this.singleShow.originalTitle = data.original_title;
        this.singleShow.overview = data.overview;
        this.singleShow.popularity = data.popularity;
        this.singleShow.posterPath = data.poster_path;
        this.singleShow.productionCompanies = ['test2'];
        this.singleShow.productionCountries = ['test3'];
        this.singleShow.releaseDate = data.release_date; // might need to be date?
        this.singleShow.revenue = data.revenue;
        this.singleShow.runtime = data.runtime;
        this.singleShow.spokenLanguages = ['test4'];
        this.singleShow.status = data.status;
        this.singleShow.tagline = data.tagline;
        this.singleShow.title = data.title;
        this.singleShow.video = data.video;
        this.singleShow.voteAverage = data.vote_average;
        this.singleShow.voteCount = data.vote_count;

        return this.singleShow;
    }
}

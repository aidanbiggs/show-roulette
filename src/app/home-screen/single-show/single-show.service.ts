import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SingleMovieType} from './single-movie.type';
import {AppConstants} from '../../app.consts';
import {SingleSeriesType} from './single-series.type';
import {SingleShowType} from './single-show.type';

@Injectable({
    providedIn: 'root'
})
export class SingleShowService {
    private _httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this._httpClient = httpClient;
    }

    public getSingleMovie(id: number): Observable<SingleMovieType> {
        return this._httpClient.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${AppConstants.API_KEY}`)
            .pipe(
                map((response) => this.mapSingleMovie(response)
                )
            );
    }

    public getSingleTv(id: number): Observable<SingleSeriesType> {
        return this._httpClient.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${AppConstants.API_KEY}`)
            .pipe(
                map((response) => this.mapSingleSeries(response)
                )
            );
    }

    public mapSingleMovie(data: any): SingleMovieType {
        const singleMovie: SingleMovieType = new SingleMovieType();
        singleMovie.adult = data.adult;
        singleMovie.backdropPath = data.backdrop_path;
        singleMovie.belongsToCollection = {};
        singleMovie.budget = data.budget;
        singleMovie.genres = ['test1'];
        singleMovie.homepage = data.homepage;
        singleMovie.id = data.id;
        singleMovie.imdbId = data.imdb_id;
        singleMovie.originalLanguage = data.original_language;
        singleMovie.originalTitle = data.original_title;
        singleMovie.overview = data.overview;
        singleMovie.popularity = data.popularity;
        singleMovie.posterPath = data.poster_path ? `http://image.tmdb.org/t/p/w342/${data.poster_path}` : 'https://vignette.wikia.nocookie.net/undertale-rho/images/5/5f/Placeholder.jpg/revision/latest?cb=20180213155916';
        singleMovie.productionCompanies = ['test2'];
        singleMovie.productionCountries = ['test3'];
        singleMovie.releaseDate = data.release_date; // might need to be date?
        singleMovie.revenue = data.revenue;
        singleMovie.runtime = data.runtime;
        singleMovie.spokenLanguages = ['test4'];
        singleMovie.status = data.status;
        singleMovie.tagline = data.tagline;
        singleMovie.title = data.title;
        singleMovie.video = data.video;
        singleMovie.voteAverage = data.vote_average;
        singleMovie.voteCount = data.vote_count;

        return singleMovie;
    }

    mapSingleSeries(data: any): SingleSeriesType {
        const singleSeries: SingleSeriesType = new SingleSeriesType();

        singleSeries.backdropPath = data.backdrop_path;
        singleSeries.createdBy = data.created_by;
        singleSeries.episodeRunTime = data.episode_run_time;
        singleSeries.firstAirDate = data.first_air_date;
        singleSeries.genres = data.genres;
        singleSeries.homepage = data.homepage;
        singleSeries.id = data.id;
        singleSeries.inProduction = data.in_production;
        singleSeries.languages = data.languages;
        singleSeries.lastEpisodeToAir = data.last_episode_to_air;
        singleSeries.name = data.name;
        singleSeries.nextEpisodeToAir = data.next_episode_to_air;
        singleSeries.networks = data.networks;
        singleSeries.numberOfEpisodes = data.number_of_episodes;
        singleSeries.numberOfSeasons = data.number_of_seasons;
        singleSeries.originOfCountry = data.origin_of_country;
        singleSeries.originalLanguage = data.original_language;
        singleSeries.originalName = data.original_name;
        singleSeries.overview = data.overview;
        singleSeries.popularity = data.popularity;
        singleSeries.posterPath = data.poster_path ? `http://image.tmdb.org/t/p/w342/${data.poster_path}` : 'https://vignette.wikia.nocookie.net/undertale-rho/images/5/5f/Placeholder.jpg/revision/latest?cb=20180213155916';
        singleSeries.productionCompanies = data.production_companies;
        singleSeries.seasons = data.seasons;
        singleSeries.status = data.status;
        singleSeries.type = data.type;
        singleSeries.voteAverage = data.vote_average;
        singleSeries.voteCount = data.vote_count;

        return singleSeries;

    }

    mapSingleShowType(data: any): SingleShowType {
        const singleShow: SingleShowType = new SingleShowType();

        singleShow.id = data.id;
        singleShow.title = data.title || data.name;
        singleShow.posterPath = data.posterPath;
        singleShow.overview = data.overview;
        singleShow.tagline = data.tagline || '';

        return singleShow;
    }

    public getValidMovie(latestMovieId: number): Observable<SingleMovieType> {
        let singleShowId: number;
        singleShowId = this.randomNumberBetween(0, latestMovieId);
        return this.getSingleMovie(singleShowId)
            .pipe(
                map((data) => {
                    if (data) {
                        return data;
                    }
                }), catchError((error) => {
                    if (error.status === 404) {
                        return this.getValidMovie(latestMovieId);
                    }

                    return null;
                })
            );
    }

    public getValidSeries(latestSeriesId: number): Observable<SingleSeriesType> {
        let singleShowId: number;
        singleShowId = this.randomNumberBetween(0, latestSeriesId);
        return this.getSingleTv(singleShowId)
            .pipe(
                map((data) => {
                    if (data) {
                        return data;
                    }
                }), catchError((error) => {
                    if (error.status === 404) {
                        return this.getValidSeries(latestSeriesId);
                    }

                    return null;
                })
            );
    }

    public randomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public getLatestMovie(): Observable<SingleMovieType> {
        return this._httpClient.get(`https://api.themoviedb.org/3/movie/latest?api_key=${AppConstants.API_KEY}`).pipe(
            map((response) => this.mapSingleMovie(response)
            )
        );
    }

    public getLatestTv(): Observable<SingleSeriesType> {
        return this._httpClient.get(`https://api.themoviedb.org/3/tv/latest?api_key=${AppConstants.API_KEY}`).pipe(
            map((response) => this.mapSingleSeries(response)
            )
        );
    }
}
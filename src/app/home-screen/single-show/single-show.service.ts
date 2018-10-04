import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SingleMovieType} from './single-movie.type';
import {map} from 'rxjs/operators';
import {AppConstants} from '../../app.consts';
import {SingleTvType} from './single-tv.type';

@Injectable({
    providedIn: 'root'
})
export class SingleShowService {
    public readonly singleMovie: SingleMovieType = new SingleMovieType;
    public readonly singleTv: SingleTvType = new SingleTvType();

    private _httpClient: HttpClient;


    constructor(httpClient: HttpClient) {
        this._httpClient = httpClient;
    }

    public getSingleMovie(id: Observable<number>): Observable<SingleMovieType> {
        return this._httpClient.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${AppConstants.API_KEY}`)
            .pipe(
                map((response) => this.mapSingleMovie(response)
                )
            );
    }

    public mapSingleMovie(data: any): SingleMovieType {

        this.singleMovie.adult = data.adult;
        this.singleMovie.backdropPath = data.backdrop_path;
        this.singleMovie.belongsToCollection = {};
        this.singleMovie.budget = data.budget;
        this.singleMovie.genres = ['test1'];
        this.singleMovie.homepage = data.homepage;
        this.singleMovie.id = data.id;
        this.singleMovie.imdbId = data.imdb_id;
        this.singleMovie.originalLanguage = data.original_language;
        this.singleMovie.originalTitle = data.original_title;
        this.singleMovie.overview = data.overview;
        this.singleMovie.popularity = data.popularity;
        this.singleMovie.posterPath = `http://image.tmdb.org/t/p/w342/${data.poster_path}`;
        this.singleMovie.productionCompanies = ['test2'];
        this.singleMovie.productionCountries = ['test3'];
        this.singleMovie.releaseDate = data.release_date; // might need to be date?
        this.singleMovie.revenue = data.revenue;
        this.singleMovie.runtime = data.runtime;
        this.singleMovie.spokenLanguages = ['test4'];
        this.singleMovie.status = data.status;
        this.singleMovie.tagline = data.tagline;
        this.singleMovie.title = data.title;
        this.singleMovie.video = data.video;
        this.singleMovie.voteAverage = data.vote_average;
        this.singleMovie.voteCount = data.vote_count;

        return this.singleMovie;
    }

    mapSingleTv(data: any): SingleTvType {
       this.singleTv.backdropPath = data.backdrop_path;
       this.singleTv.createdBy = data.created_by;
       this.singleTv.episodeRunTime = data.episode_run_time;
       this.singleTv.firstAirDate = data.first_air_date;
       this.singleTv.genres = data.genres;
       this.singleTv.homepage = data.homepage;
       this.singleTv.id = data.id;
       this.singleTv.inProduction = data.in_production;
       this.singleTv.languages = data.languages;
       this.singleTv.lastEpisodeToAir = data.last_episode_to_air;
       this.singleTv.name = data.name;
       this.singleTv.nextEpisodeToAir = data.next_episode_to_air;
       this.singleTv.networks = data.networks;
       this.singleTv.numberOfEpisodes = data.number_of_episodes;
       this.singleTv.numberOfSeasons = data.number_of_seasons;
       this.singleTv.originOfCountry = data.origin_of_country;
       this.singleTv.originalLanguage = data.original_language;
       this.singleTv.originalName = data.original_name;
       this.singleTv.overview = data.overview;
       this.singleTv.popularity = data.popularity;
       this.singleTv.posterPath = data.poster_path;
       this.singleTv.productionCompanies = data.production_companies;
       this.singleTv.seasons = data.seasons;
       this.singleTv.status = data.status;
       this.singleTv.type = data.type;
       this.singleTv.voteAverage = data.vote_average;
       this.singleTv.voteCount = data.vote_count;

       return this.singleTv;

    }
}


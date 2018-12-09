import { GenreType } from './genre.type';
import { LanguageType } from './language.type';

export class FilterType {
    language: LanguageType;
    includeAdult: boolean;
    releaseYearGte: number;
    releaseYearLte: number;
    averageRatingGte: number;
    averageRatingLte: number;
    withCast: number;
    withoutGenres: GenreType;
    runTimeGte: number;
    runTimeLte: number;
}

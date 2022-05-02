import { IOmdbDto } from "../models/inputOmdb.dto";
import { MovieDetails } from "../models/MovieDetails";


export function mappingMovieFromOMDB(movieInfo: IOmdbDto): MovieDetails {
    return {
        Title: movieInfo.Title,
        Actors: movieInfo.Actors,
        Director: movieInfo.Director,
        Genre: movieInfo.Genre,
        Released: movieInfo.Released,
        Plot: movieInfo.Plot,
        Runtime: movieInfo.Runtime,
        Awards: movieInfo.Awards,
    };
}

import axios from 'axios';
import config from 'config';

import {
    MovieDetails
} from '../models/movie.models';
import log from '../utils/logger';

export async function getMovie(title: string): Promise<MovieDetails | null> {
    const apikey = config.get("omdb_key");

    const apiUrl = config.get("apiUrl");
    const url = apiUrl + title + '&apikey=' + apikey;
    try {
        const {
            data: movieInfo
        } = await axios.get(url)

        if (movieInfo.Response !== "False") {
            log.info(movieInfo, 'movie info from axios')
            const movie: MovieDetails = {
                Title: movieInfo.Title,
                Actors: movieInfo.Actors,
                Director: movieInfo.Director,
                Genre: movieInfo.Genre,
                Released: movieInfo.Released,
                Plot: movieInfo.Plot,
                Runtime: movieInfo.Runtime,
                Awards: movieInfo.Awards
            };
            log.info(movie, 'movie movieinput');

            return movie;
        }
        return null;
    } catch (error: any) {
        log.error(error);
        return null;
    }
}
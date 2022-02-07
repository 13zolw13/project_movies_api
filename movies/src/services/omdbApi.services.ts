import axios from 'axios';
import config from 'config';

import {
    MovieDetails
} from '../models/movie.models';
import log from '../utils/logger';

export async function getMovie(title: string) {
    const apikey = config.get("omdb_key");

    const apiUrl = config.get("apiUrl");
    const url = apiUrl + title + '&apikey=' + apikey;
    try {
        const {
            data: movieInfo
        } = await axios.get(url)
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
        log.info('movie movieinput', movie);
        return movie;
    } catch (error) {
        log.error(error);
        return;
    }
}
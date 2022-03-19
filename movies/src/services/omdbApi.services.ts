require('dotenv').config();
import axios from 'axios';
import config from 'config';
import { CustomError } from '../models/custom-error.models';

import {
    MovieDetails
} from '../models/movie.models';
import log from '../utils/logger';

export async function getMovie(title: string): Promise<MovieDetails | null> {
    const apikey = <string>process.env.OMDB_KEY || config.get<string>("omdb_key");

    const apiUrl = config.get<string>("apiUrl");
    const url = apiUrl + title + '&apikey=' + apikey;
    console.log(url, "Url");

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
        throw new CustomError(404, 'Not found', error.message)
        return null;
    }
}
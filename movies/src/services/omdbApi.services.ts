import axios from 'axios';
import config from 'config';
import z from 'zod';
import {
    MovieDetails
} from '../models/movie.models';

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
        console.log('movie movieinput', movie);
        return movie;
    } catch (error) {
        console.error(error);
        return;
    }
}
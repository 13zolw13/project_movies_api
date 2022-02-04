import axios from 'axios';
import config from 'config';


export async function getMovie(title: string) {
    const apikey = config.get<string>("omdb_key");
    const apiUrl = config.get<string>("apiUrl");
    const url = apiUrl + title + '&apikey=' + apikey;
    try {
        const {
            data: movieInfo
        } = await axios.get(url)
        const movie = {
            Title: movieInfo.Title,
            Actors:movieInfo.Actors,
            Director: movieInfo.Director,
            Genre: movieInfo.Genre,
            Released: movieInfo.Released,
            Plot: movieInfo.Plot,
            Runtime: movieInfo.Runtime,
            Awards: movieInfo.Awards
        }
        return movie
    } catch (error) {
        console.error(error);
        return;
    }
}
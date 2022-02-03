import axios from 'axios';
import config from 'config';
import jwt from 'jsonwebtoken';
import MovieModel from '../models/movie.models';

const hideDetials = '-_id -__v -createdAt -updatedAt';

export async function getMovie(title: string) {
    const apikey = config.get("omdb_key");
    const url = 'https://www.omdbapi.com/?t=' + title + '&apikey=' +  apikey;
    try {
        const {
            data: movieInfo
        } = await axios.get(url)
        const movie = {
            Title: movieInfo.Title,
            Director: movieInfo.Director,
            Genre: movieInfo.Genre,
            Released: movieInfo.Released
        }
        return movie
    } catch (error) {
        console.error(error);
        return;
    }
}

export function getAllMovies() {
    return MovieModel.find({}).select(hideDetials)
}


export async function getAuthUser(username: string, password: string) {
    const url = 'http://auth:3000/auth';

    try {
        return await axios.post(url, {
            username: username,
            password: password
        });
    } catch (error: any) {
        console.error(error);
        return;
    }
}


export function encodedUser(token: string) {
    const key = process.env.JWT_SECRET
    const data = jwt.verify(token, key!)
    if (!data) {
        return;
    }

    return data;
}

export async function checkHowManyAdded(userId: string): Promise < boolean > {
    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let queryDate = year + '-' + month + '-01';


    const Movies = await MovieModel.find({
        AddedBy: userId,
        createdAt: {
            $gte: queryDate
        }
    });

    if (Movies.length < 6) {
        return true;

    }
    return false
}
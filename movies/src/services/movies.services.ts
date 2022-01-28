import axios from 'axios';
import jwt, { JwtPayload } from 'jsonwebtoken';
import MovieModel, { UserJWT } from '../models/movie.models';
const Movie = require('../schemas/movie.schema')

export async function getMovie(title: string) {
    const url = 'https://www.omdbapi.com/?t=' + title + '&apikey=' + process.env.OMDB_KEY
    try {
        const { data: movieInfo } = await axios.get(url)
        const movie = { Title: movieInfo.Title, Director: movieInfo.Director, Genre: movieInfo.Genre, Released: movieInfo.Released }
        return movie
    } catch (error) {
        console.error(error);
        return;
    }
}

export function getAllMovies() {
    return MovieModel.find({}).select('-_id -__v -createdAt -updatedAt')
}


export async function getAuthUser(username: string, password: string) {
    const url = 'http://localhost:3003/auth';

    try {
        return await axios.post(url, { username: username, password: password });
    } catch (error) {
        console.log(error);
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

export async function checkHowManyAdded(userId: string): Promise<boolean> {

    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let queryDate = year + '-' + month + '-01';
    console.log('this month', queryDate);

    const Movies = await MovieModel.find({ AddedBy: userId, createdAt: { $gte: queryDate } });
    console.log(Movies.length)
    if (Movies.length < 6) {
        return true;

    }
    return false
}
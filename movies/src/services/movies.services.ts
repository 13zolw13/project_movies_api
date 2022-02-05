import axios from 'axios';
import config from 'config';
import jwt from 'jsonwebtoken';
import MovieModel from '../models/movie.models';

const hideDetials = '-_id -__v -createdAt -updatedAt -Plot -Actors -Runtime -Awards';


export function getAllMovies(userId: string) {
    return MovieModel.find({ AddedBy: userId }) //.select(hideDetials)
}

export function findMovieById(movieId: string) {
    return MovieModel.find({ _id: movieId }) //.select(hideDetials);
}





export async function checkHowManyAdded(userId: string): Promise<boolean> {
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
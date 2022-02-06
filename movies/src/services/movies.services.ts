import axios from 'axios';
import config from 'config';
import jwt from 'jsonwebtoken';
import MovieModel, { Movie, UserJWT } from '../models/movie.models';
import { getMovie } from './omdbApi.services';

const hideDetials = '-_id -__v -createdAt -updatedAt -Plot -Actors -Runtime -Awards';


export function getAllMovies(userId: string) {
    return MovieModel.find({ AddedBy: userId }) //.select(hideDetials)
}

export function findMovieById(movieId: string) {
    return MovieModel.find({ _id: movieId }) //.select(hideDetials);
}





export async function checkHowManyAdded(userId: number): Promise<boolean> {
    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let queryDate = year + '-' + month + '-01';
    let limitBasic = config.get<number>("limitBasic")
    console.log(limitBasic);
    const Movies = await MovieModel.find({
        AddedBy: userId,
        createdAt: {
            $gte: queryDate
        }
    });

    if (Movies.length < limitBasic) {
        return true;

    }
    return false
}


export async function termsForAddingMovie(User: UserJWT, title: string) {

    console.log("User role:", User.role, 'User id:', User.userId, ' Title: ', title);
    const howMany = await checkHowManyAdded(User.userId);
    console.log(howMany, 'less then five')
    if (User.role === 'premium' || howMany) {
        console.log('User premium or less then five');


        const searchTitle = '/' + title + '/';
        console.log(searchTitle, 'title regex')
        const existingMovie = await MovieModel.find({
            Title: { $regex: title, $options: 'i' }, AddedBy: User.userId
        });
        // 
        console.log('length array of the same movies', existingMovie.length)
        if (existingMovie.length < 1) {
            console.log('Movie with the same title doesnt exists on users list', existingMovie);
            return await getMovie(title);

        }

    }
    return;
}



    // if (!movieData) {
    //     return res.status(400).send('No movie data ');
    // }






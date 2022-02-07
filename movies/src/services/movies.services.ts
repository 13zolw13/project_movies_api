import config from 'config';
import MovieModel, {
    UserJWT
} from '../models/movie.models';
import DateforDb from '../utils/getDate';

import log from '../utils/logger';
import {
    getMovie
} from './omdbApi.services';

const hideDetials = '-_id -__v -createdAt -updatedAt -Plot -Actors -Runtime -Awards';


export function getAllMovies(userId: string) {
    return MovieModel.find({
        AddedBy: userId
    }) //.select(hideDetials)
}

export function findMovieById(movieId: string) {
    return MovieModel.find({
        _id: movieId
    }) //.select(hideDetials);
}


export async function checkHowManyAdded(userId: number): Promise<boolean> {

    let queryDate = DateforDb();
    let limitBasic = config.get<number>("limitBasic")
    log.info(limitBasic);
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

    const howMany = await checkHowManyAdded(User.userId);
    log.info(howMany, 'check how many if less then limit returns true');

    if (User.role === 'premium' || howMany) {
        log.info('User premium or less then five');

        const existingMovie = await MovieModel.find({
            Title: {
                $regex: title,
                $options: 'i'
            },
            AddedBy: User.userId
        });
         
        log.info('length array of the same movies', existingMovie.length)
        if (existingMovie.length < 1) {
            log.info('Movie with the same title doesnt exists on users list', existingMovie);
            return await getMovie(title);

        }

    }
    return;
}
import config from 'config';
import MovieModel, {
    UserJWT
} from '../models/movie.models';
import DateforDb from '../utils/getDate';

import log from '../utils/logger';
import {
    getMovie
} from './omdbApi.services';

const hideDetails = ["-_id", "-__v", "-createdAt", "-updatedAt", "-AddedBy"];
const shortDetails = [",-Plot", "-Actors", "-Runtime", "-Awards"];



export function getAllMovies(userId: string) {
    const whatToHide = (hideDetails.join(',') + shortDetails.join(',')).split(",");
    log.info(whatToHide, 'What to hide')
    return MovieModel.find({
        AddedBy: userId
    }).select(whatToHide)
}

export function findMovieById(movieId: string) {
    const whatToHide = hideDetails;
    return MovieModel.find({
        _id: movieId
    }).select(whatToHide);
}


export async function checkHowManyAdded(userId: number): Promise<boolean> {

    let queryDate = DateforDb();
    let limitBasic = config.get<number>("limitBasic")
    log.info(limitBasic, 'Set limit for basic user');
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

        log.info(existingMovie.length, 'length array of the same movies',)
        if (existingMovie.length < 1) {
            log.info(existingMovie, 'Movie with the same title doesnt exists on users list');
            return await getMovie(title);

        }

    }
    return;
}
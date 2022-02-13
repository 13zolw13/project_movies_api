import config from 'config';
import { CustomError } from '../models/custom-error.models';
import MovieModel, {

    UserJWT
} from '../models/movie.models';
import DateforDb from '../utils/getDate';

import log from '../utils/logger';
import {
    getMovie
} from './omdbApi.services';


export async function getAllMovies(userId: number) {
    // const whatToHide = (hideDetails.join(',') + shortDetails.join(',')).split(",");
    // log.info(whatToHide, 'What to hide

    try {
        const data = await MovieModel.findMoviesAddedByUser(userId)
        log.info(data, 'Class movie findbyid');
        return data;
    } catch (error: any) {
        log.error(error.message, 'Something went wrong');

        throw new CustomError(400, 'Something went wrong ', error.message)
    }

    // return MovieModel.find({
    //     AddedBy: userId
    // }).select(whatToHide)
}

export async function findMovieById(movieId: string, userId: number) {
    // const whatToHide = hideDetails;
    try {
        const data = await MovieModel.findMovieDetails(movieId, userId);
        console.log(data, 'details about this movie');
        return data;
        // return MovieModel.find({
        //     _id: movieId
        // })

    } catch (error: any) {
        throw new CustomError(403, 'No movie data', error.message)
    }

    // .select(whatToHide);
}


export async function checkHowManyAdded(userId: number): Promise<boolean> {

    let queryDate = DateforDb();
    let limitBasic = config.get<number>("limitBasic")
    log.info(queryDate, 'Daye')
    log.info(limitBasic, 'Set limit for basic user');

    try {
        const HowManyMoviesAdded = await MovieModel.checkHowManyMovies(userId, queryDate);
        console.log(HowManyMoviesAdded.length, 'Movies added by user')
        log.info(HowManyMoviesAdded, 'Movies added by user')
        if (HowManyMoviesAdded.length < limitBasic) {
            return true;

        }
        return false
    } catch (error: any) {
        log.error(error.message, 'Something went wrong');

        throw new CustomError(400, 'Something went wrong ', error.message)
    }
}


export async function termsForAddingMovie(User: UserJWT, title: string) {

    // copmpering how many
    try {


        const howMany = await checkHowManyAdded(User.userId);


        log.info(howMany, 'check how many if less then limit returns true');

        if (User.role === 'premium' || howMany) {
            log.info('User premium or less then five');

            // const existingMovie = await MovieModel.find({
            //     Title: {
            //         $regex: title,
            //         $options: 'i'
            //     },
            //     AddedBy: User.userId
            // });
            const existingMovie = await MovieModel.checkIfArleadyExists(title, User.userId);

            log.info(existingMovie.length, 'length array of the same movies',)
            if (existingMovie.length < 1) {
                log.info(existingMovie, 'Movie with the same title doesnt exists on users list');
                return await getMovie(title);

            }

        }
    } catch (error: any) {
        log.error(error.message, 'Something went wrong');

        throw new CustomError(400, 'Movie cannot be added', error.message)
    }

}
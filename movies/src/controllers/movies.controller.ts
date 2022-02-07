import {
    Request,
    Response
} from "express";
import MovieModel, {
    UserJWT
} from "../models/movie.models";
import {
    AddMovieInput
} from "../schemas/movie.schema";
import {
    getAllMovies,
    findMovieById,
    termsForAddingMovie
} from "../services/movies.services";
import log from "../utils/logger";




export async function listOfAllMovies(req: Request, res: Response) {
    const User = res.locals.user;

    if (!User) {
        return res.status(403).send('No movies in DB');
    }

    const movies = await getAllMovies(User.userId);
    log.info(movies, ' ListOfALLMovies -> all movies added by a user');

    if (!movies) {
        return res.status(404).send('No movies in DB');
    }
    return res.status(200).send({
        msg: 'List of all movies',
        movies
    });

}

export async function movieDetails(req: Request, res: Response) {
    const {
        id
    } = req.params;

    const movie = await findMovieById(id);
    if (!movie) {
        return res.status(400).send('No movies in DB');
    }
    return res.status(200).send({
        msg: 'Details of this movie',
        movie
    });
}



export async function addMovie(req: Request<{}, AddMovieInput>, res: Response) {
    const {
        title
    } = req.body

    const User = res.locals.user as UserJWT;


    if (!User) {
        return res.status(403).send('User not authorized');
    }
    if (!title) {
        return res.status(400).send('No movie data ');
    }

    const movieData = await termsForAddingMovie(User, title);

    if (!movieData) {
        return res.status(404).send('No movie data from terms ');
    }

    const movie = await MovieModel.create({
        ...movieData,
        AddedBy: User.userId
    });

    if (movie) {

        return res.status(201)
            .send({
                msg: 'Movie succesfully added to db',
                movie
            })
    }

    if (!movie) {
        return res.status(404).send('Something went wrong');
    }
}
import {
    Request,
    Response
} from "express";
import jwt, {
    JwtPayload
} from "jsonwebtoken";
import MovieModel, {
    UserJWT
} from "../models/movie.models";
import {
    AddMovieInput
} from "../schemas/movie.schema";
import {
    checkHowManyAdded,


    getAllMovies,
    findMovieById,
    termsForAddingMovie
} from "../services/movies.services";
import {
    getAuthUser
} from "../services/getUser.service";
import {
    getMovie
} from "../services/omdbApi.services";
import {
    encodedUser
} from "../utils/jwt";



export async function listOfAllMovies(req: Request, res: Response) {
    const User = res.locals.user;

    if (!User) {
        return res.status(400).send('No movies in DB');
    }

    const movies = await getAllMovies(User.userId);
    console.log('all movies added by a user', movies);


    if (!movies) {
        return res.status(400).send('No movies in DB');
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
    console.log('title->', title, 'UseriD from res.loclas', User.userId);
    const movieData = await termsForAddingMovie(User, title);

    if (!movieData) {
        return res.status(400).send('No movie data from terms ');
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
        return res.status(400).send('Something went wrong');
    }
}
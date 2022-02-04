import {
    Request,
    Response
} from "express";
import {
    JwtPayload
} from "jsonwebtoken";
import MovieModel from "../models/movie.models";
import {
    AddMovieInput
} from "../schemas/movie.schema";
import {
    checkHowManyAdded,

    getAuthUser, getAllMovies, findMovieById
} from "../services/movies.services";
import { getMovie } from "../services/omdbApi.services";
import { encodedUser } from "../utils/jwt";



export async function listOfAllMovies(req: Request, res: Response) {
    const userId = '123'
    const movies = await getAllMovies(userId);

    if (!movies) {
        return res.status(400).send('No movies in DB');
    }
    return res.status(200).send({
        msg: 'List of all movies',
        movies
    });
}

export async function movieDetails(req: Request, res: Response) {
    const { id } = req.params;

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
        title,
        username,
        password
    } = req.body

    const data = await getAuthUser(username, password);
    if (!data) {
        return res.status(404).send('User not authorized');
    }
    const User = await encodedUser(data.data.token) as JwtPayload
    console.log('Encoded User info', User)
    if (!User) {
        return res.status(404).send('User not authorized');
    }


    if (User.role === 'premium' || (!checkHowManyAdded(User.userId))) {
        console.log('User premium or less then five');


        if (!title) {
            return res.status(400).send('No title given');
        }
        const movieData = await getMovie(title);
        if (!movieData) {
            return res.status(400).send('No movie data ');
        }
        const movie = await MovieModel.create({
            ...movieData,
            AddedBy: User.userId
        });
        // , 

        return res.status(201).send({
            msg: 'Movie succesfully added to db',
            movie
        })
    }
    return res.status(400).send({
        msg: 'Cannot be added'
    });
}
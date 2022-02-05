import {
    Request,
    Response
} from "express";
import jwt, {
    JwtPayload
} from "jsonwebtoken";
import MovieModel from "../models/movie.models";
import {
    AddMovieInput
} from "../schemas/movie.schema";
import {
    checkHowManyAdded,


    getAllMovies,
    findMovieById
} from "../services/movies.services";
import { getAuthUser } from "../services/getUser.service";
import {
    getMovie
} from "../services/omdbApi.services";
import {
    encodedUser
} from "../utils/jwt";



export async function listOfAllMovies(req: Request, res: Response) {
    const User = res.locals.user;
    // console.log('res.locals', res.locals.user);
    // console.log('List of all movies by id', User.userId);

    // console.log('req.body', req.body);
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
        title,
        // username,
        // password
    } = req.body

    const User = res.locals.user;
    console.log('User AddMovie', User);
    // const data = await getAuthUser(username, password);
    // if (!data) {
    //     return res.status(404).send('User not authorized');
    // }
    // // const User = await encodedUser(data.data.token) as JwtPayload

    // console.log('Encoded User info', User)
    // if (!User) {
    //     return res.status(404).send('User not authorized');
    // }

    // const singtoken = jwt.sign({
    //     User
    // }, 'blabla');
    // console.log(singtoken, ' <= Sign token');
    if (!User) {
        return res.status(404).send('User not authorized');
    }

    if (User.role === 'premium' || (!checkHowManyAdded(User.userId))) {
        console.log('User premium or less then five');


        if (!title) {
            return res.status(400).send('No title given');
        }
        const movieData = await getMovie(title);
        console.log('movieData from axios', movieData);
        console.log('user id ', User.userId)
        if (!movieData) {
            return res.status(400).send('No movie data ');
        }
        const movie = await MovieModel.create({
            ...movieData,
            AddedBy: User.userId
        });
        // , 
        console.log('Movie after saving into DB ', movie)
        // .cookie('token', singtoken, { signed: true })
        return res.status(201)
            .send({
                msg: 'Movie succesfully added to db',
                movie
            })
    }
    return res.status(400).send({
        msg: 'Cannot be added'
    });
}
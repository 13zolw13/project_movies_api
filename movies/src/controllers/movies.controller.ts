import { Request, Response } from "express";
import { CustomError } from "../models/custom-error.models";
import MovieModel from "../models/movie.models";
import { LoginUserInput } from "../schemas/login.schema";
import { AddMovieInput, MovieDetailsInput } from "../schemas/movie.schema";
import {
	findMovieById,
	getAllMovies,
	termsForAddingMovie,
} from "../services/movies.services";
import log from "../utils/logger";

export async function listOfAllMovies(
	req: Request,
	res: Response<{}, LoginUserInput>
) {
	if (!res.locals.user) {
		return res.status(403).send("No movies in DB");
	}
	log.info(res.locals.user, " ListOfALLMovies ->User");
	const movies = await getAllMovies(res.locals.user);
	log.info(movies, " ListOfALLMovies -> all movies added by a user");

	if (!movies) {
		return res.status(404).send("No movies in DB");
	}
	return res.status(200).send({
		msg: "List of all movies",
		movies,
	});
}

export async function movieDetails(
	req: Request<MovieDetailsInput["params"]>,
	res: Response<{}, MovieDetailsInput["locals"]>
) {
	const { id } = req.params;
	const { userId } = res.locals.user;

	const movie = await findMovieById(id, userId);
	console.log(movie, "movie movie data");
	if (!movie) {
		return res.status(400).send("No movies in DB");
	}
	return res.status(200).send({
		msg: "Details of this movie",
		movie,
	});
}

export async function addMovie(
	req: Request<{}, {}, AddMovieInput["body"]>,
	res: Response<{}, AddMovieInput["locals"]>
) {
	const { title } = req.body;

	const User = res.locals.user;

	try {
		const movieData = await termsForAddingMovie(User.userId, User.role, title);

		if (!movieData) {
			return res.status(404).send("No movie data from terms ");
		}

		const movie = await MovieModel.create({
			...movieData,
			AddedBy: User.userId,
		});

		return res.status(201).send({
			msg: "Movie successfully added to db",
			movie,
		});
	} catch (error: any) {
		throw new CustomError(404, "Something went wrong", error.message);
	}
}

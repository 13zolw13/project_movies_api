import config from 'config';
import {
    CustomError
} from '../models/custom-error.models';
import MovieModel from '../models/movie.models';
import DateforDb from "../utils/getDate";
import log from "../utils/logger";
import { getMovie } from "./omdbApi.services";

export async function getAllMovies(userId: number) {
	try {
		const data = await MovieModel.findMoviesAddedByUser(userId);
		return data;
	} catch (error: any) {
		log.error(error.message, "Something went wrong");

		throw new CustomError(400, "Something went wrong ", error.message);
	}
}

export async function findMovieById(movieId: string, userId: number) {
	try {
		const data = await MovieModel.findMovieDetails(movieId, userId);
		return data;
	} catch (error: any) {
		throw new CustomError(403, "No movie data", error.message);
	}
}

export async function checkHowManyAdded(userId: number): Promise<boolean> {
	let queryDate = DateforDb();
	let limitBasic = config.get<number>("limitBasic");
	log.info(limitBasic, "Set limit for basic user");

	try {
		const HowManyMoviesAdded = await MovieModel.checkHowManyMovies(
			userId,
			queryDate
		);
		console.log(HowManyMoviesAdded.length, "How many movies are added by user");

		if (HowManyMoviesAdded.length < limitBasic) {
			return true;
		}
		return false;
	} catch (error: any) {
		log.error(error.message, "Something went wrong");
		throw new CustomError(400, "Something went wrong ", error.message);
	}
}

export async function termsForAddingMovie(
	userId: number,
	userRole: string,
	title: string
) {
	try {
		const howMany = await checkHowManyAdded(userId);

		if (userRole === "premium" || howMany) {
			const existingMovie = await MovieModel.checkIfAlreadyExists(
				title,
				userId
			);
			log.info(title, "Searching if already exists");
			log.info(existingMovie, "length array of the same movies");

			if (!existingMovie) {
				log.info(
					existingMovie,
					"Movie with the same title doesn't exists on users list"
				);
				return await getMovie(title);
			}
			return null;
		}

		return null;
	} catch (error: any) {
		log.error(error.message, "Something went wrong");
		throw new CustomError(400, "Movie cannot be added", error.message);
	}
}
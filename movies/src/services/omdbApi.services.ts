require('dotenv').config();
import axios from "axios";
import config from "config";
import { CustomError } from "../models/custom-error.models";
import { IOmdbDto } from "../models/inputOmdb.dto";
import { MovieDetails } from "../models/MovieDetails";
import log from "../utils/logger";
import { mappingMovieFromOMDB } from "./mappingMovieFromOMDB";

export async function getMovie(title: string): Promise<MovieDetails | null> {
	try {
		const apikey = config.get<string>("omdb_key");

		const apiUrl = config.get<string>("apiUrl");
		const url = apiUrl + title + "&apikey=" + apikey;
		const data = await axios.get(url);
		const movieInfo = data.data as IOmdbDto;

		if (movieInfo.Response !== "False") {
			log.info(movieInfo, "movie info from axios");
			const movie: MovieDetails = mappingMovieFromOMDB(movieInfo);
			log.info(movie, "movie movie input");

			return movie;
		}
		return null;
	} catch (error: any) {
		log.error(error);
		throw new CustomError(404, "Not found", error.message);
	}
}


import {
	getModelForClass,
	modelOptions,
	pre,
	ReturnModelType,
} from "@typegoose/typegoose";
import { hideDetails, shortDetails } from '../data/hidedata';
import { Movie } from "./Movie.entity";


@pre<MovieService>("save", function () {
	const date = new Date(this.Released);
	this.Released = date.toString();
})
@modelOptions({
	schemaOptions: {
		timestamps: true,
	},
})

// @Service()
export class MovieService extends Movie {
	public static async findMoviesAddedByUser(
		this: ReturnModelType<typeof Movie>,
		userId: number
	) {
		const whatToHide = (hideDetails.join(",") + shortDetails.join(",")).split(
			","
		);

		return await this.find({ AddedBy: userId }).select(whatToHide);
	}

	public static async findMovieDetails(
		this: ReturnModelType<typeof Movie>,
		movieId: string,
		userId: number
	) {
		const whatToHide = hideDetails;

		return await this.findOne({ _id: movieId, AddedBy: userId }).select(
			whatToHide
		);
	}

	public static checkHowManyMovies(
		this: ReturnModelType<typeof Movie>,
		userId: number,
		queryDate: string
	) {
		// try {

		return this.find({
			AddedBy: userId,
			createdAt: {
				$gte: queryDate,
			},
		});
		// }
		// catch (error) {
		//     return 0;
		// }
	}

	public static async checkIfAlreadyExists(
		this: ReturnModelType<typeof Movie>,
		title: string,
		UserId: number
	) {
		return await this.findOne({
			Title: {
				$regex: title,
				$options: "i",
			},
			AddedBy: UserId,
		});
	}
}

const MovieModel = getModelForClass(MovieService);



export default MovieModel;
import {
    getModelForClass,
    modelOptions,
    pre,
    prop,
    ReturnModelType, DocumentType
} from "@typegoose/typegoose";
import { logger } from "@typegoose/typegoose/lib/logSettings";
import { Container, Service } from 'typedi';
import { hideDetails, shortDetails } from '../data/hidedata';


export interface UserJWT {
    userId: number,
    name: string,
    role: string,
    iat: number,
    exp: number,
    iss: string,
    sub: string,

}

export interface MovieDetails {
    Title: string
    Actors: string,
    Director: string,
    Genre: string,
    Released: string,
    Plot: string,
    Runtime: string,
    Awards: string,
}


@pre<Movie>("save", function () {
    const date = new Date(this.Released);
    this.Released = date.toString();
})
@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})
// @Service()
export class Movie {

    @prop({
        required: true
    })
    Title: string;

    @prop({
        required: true
    })
    Director: string;

    @prop({
        required: true
    })
    Released: string;

    @prop({
        required: true
    })
    Genre: string;

    @prop({
        required: true
    })
    AddedBy: number;

    @prop()
    Plot: string;

    @prop()
    Actors: string;

    @prop()
    Runtime: string;

    @prop()
    Awards: string;


    public static async findMoviesAddedByUser(this: ReturnModelType<typeof Movie>, userId: number) {
        const whatToHide = (hideDetails.join(',') + shortDetails.join(',')).split(",");

        return await this.find({ AddedBy: userId }).select(whatToHide);
    }

    public static async findMovieDetails(this: ReturnModelType<typeof Movie>, movieId: string, userId: number) {
        const whatToHide = hideDetails;

        return await this.findOne({ _id: movieId, AddedBy: userId }).select(whatToHide);;
    }

    public static checkHowManyMovies(this: ReturnModelType<typeof Movie>, userId: number, queryDate: string) {
        // try {



        return this.find({
            AddedBy: userId,
            createdAt: {
                $gte: queryDate
            }
        });;
        // }
        // catch (error) {
        //     return 0;
        // }

    }

    public static async checkIfArleadyExists(this: ReturnModelType<typeof Movie>, title: string, UserId: number) {

        return await this.findOne({
            Title: {
                $regex: title,
                $options: 'i'
            },
            AddedBy: UserId
        });
    }
}

const MovieModel = getModelForClass(Movie);



export default MovieModel;
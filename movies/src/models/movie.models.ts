import { getModelForClass, modelOptions, pre, prop } from "@typegoose/typegoose";


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
}

)

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})
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
        // required: true
    })
    AddedBy: string;

    @prop()
    Plot: string;

    @prop()
    Actors: string;

    @prop()
    Runtime: string;

    @prop()
    Awards: string;


}

const MovieModel = getModelForClass(Movie);
export default MovieModel;
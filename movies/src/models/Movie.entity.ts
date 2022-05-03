import { prop } from "@typegoose/typegoose";

export class Movie {
	@prop({
		required: true,
	})
	Title: string;

	@prop({
		required: true,
	})
	Director: string;

	@prop({
		required: true,
	})
	Released: string;

	@prop({
		required: true,
	})
	Genre: string;

	@prop({
		required: true,
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
}

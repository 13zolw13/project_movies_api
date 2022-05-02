import { number, object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *   AddMovieInput:
 *     type: object
 *     required:
 *       - title
 *     properties:
 *        title:
 *           type: string
 *           default: Pulp
 *        username:
 *            type: string
 *            default: premium-jim
 *        password:
 *            type: string
 *            default: GBLtTyq3E_UNjFnpo9m6
 */
export const addMovieSchema = object({
	body: object({
		title: string({ required_error: "Title needed!" }),
	}),
	locals: object({
		user: object({
			userId: number({ required_error: "Data required" }),
			name: string({ required_error: "Data required" }),
			role: string({ required_error: "Data required" }),
			iat: number({ required_error: "Data required" }),
			exp: number({ required_error: "Data required" }),
			iss: string({ required_error: "Data required" }),
			sub: string({ required_error: "Data required" }),
		}),
	}),
});

// export const movieSchema = object({
// Title: string(),
//     Actors: string(),
//         Director: string(),
//             Genre: string(),
//                 Released: string(),
//                     Plot: string(),
//                         Runtime: string(),
//                             Awards: string(),
// })

export const MovieDetailsSchema = object({
	params: object({
		id: string({ required_error: "Id required" }),
	}),
	locals: object({
		user: object({
			userId: number({ required_error: "Data required" }),
			name: string({ required_error: "Data required" }),
			role: string({ required_error: "Data required" }),
			iat: number({ required_error: "Data required" }),
			exp: number({ required_error: "Data required" }),
			iss: string({ required_error: "Data required" }),
			sub: string({ required_error: "Data required" }),
		}),
	}),
});

export type AddMovieInput = TypeOf<typeof addMovieSchema>;

// export type MovieInput = TypeOf<typeof movieSchema>;

export type MovieDetailsInput = TypeOf<typeof MovieDetailsSchema>;

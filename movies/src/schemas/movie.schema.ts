import { object, string, TypeOf } from "zod"

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
        title: string({ required_error: 'Title needed!' }),

    })
})

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
        id: string({ required_error: 'Id required' }),

    })
})


/**
* @openapi
* components:
*  schemas:
*   LoginInput:
*     type: object
*     required:
*       - username
*       - password
*     properties:
*        username:
*            type: string
*            default: premium-jim
*        password:
*            type: string
*            default: GBLtTyq3E_UNjFnpo9m6
*/
export const LoginSchema = object({
    body: object({
        username: string({ required_error: 'Username required' }).min(6),
        password: string({ required_error: 'Password required' }).min(6)
    })
})

export type AddMovieInput = TypeOf<typeof addMovieSchema>['body'];
export type LoginInput = TypeOf<typeof LoginSchema>['body'];
// export type MovieInput = TypeOf<typeof movieSchema>;

export type MovieDetailsInput = TypeOf<typeof MovieDetailsSchema>['params'];
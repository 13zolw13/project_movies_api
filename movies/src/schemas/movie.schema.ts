import { object, string, TypeOf } from "zod"

/**
* @openapi
* components:
*  schemas:
*   AddMovieInput:
*     type: object
*     required:
*       - title
*       - username
*       - password
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

export type AddMovieInput = TypeOf<typeof addMovieSchema>['body'];
// export type MovieInput = TypeOf<typeof movieSchema>;
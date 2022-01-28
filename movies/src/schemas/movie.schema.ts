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
        username: string({
            required_error: 'Username needed!'
        }).min(4),
        password: string({
            required_error: 'Password needed!'
        }).min(6),
    })
})

export type AddMovieInput = TypeOf<typeof addMovieSchema>['body'];
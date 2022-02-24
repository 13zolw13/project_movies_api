import express from "express"

import {authUser} from "../middleware/user.middleware";
import { addMovie, listOfAllMovies, movieDetails } from "../controllers/movies.controller";
import validateInput from "../middleware/validateInput.middleware";
import { addMovieSchema, MovieDetailsSchema } from "../schemas/movie.schema";
import { LoginUserSchema } from "../schemas/login.schema";
import checkValidMongoId from "../middleware/validateMongoId.middleware";



const router = express.Router()


/**
 *  @openapi
 *  /api/v1/movies:
 *   get:
 *      tags: 
 *        - Movies
 *      summary: Endpoint for list of all movies added by auth users.
 *      responses:
 *           404:
 *               desctription: Porduct doesnt exists
 *           200:
 *               desctription: Succes.
 *               schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    Title: string
 *                    Director: string
 *                    Released: string
 *                    Genre: string
 *                    AddedBy: string
 * 
 *                  
 *            
 */
router.get('/v1/movies', authUser, validateInput(LoginUserSchema), listOfAllMovies);
//  validateInput(LoginUserSchema),
/**
 *  @openapi
 *  '/api/v1/movies/{id}':
 *   get:
 *      tags: 
 *        - Movies
 *      summary: More details about movie.
 *      parameters:
 *       - name: id 
 *         in: path
 *         description: The Id of the product
 *         required: true
 *      responses:
 *          404:
 *              desctription: Porduct doesnt exists
 *          200:
 *              desctription: Succes.
 */
router.get('/v1/movies/:id', validateInput(MovieDetailsSchema), checkValidMongoId ,authUser, movieDetails);



/**
 *  @openapi
 *  /api/v1/movies:
 *   post:
 *      tags: 
 *        - Movies
 *      summary: Endpoint for adding movie to DB by auth user.
 *      description: Input variables to creating new movie in db.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AddMovieInput'
 *      responses:
 *           404:
 *               desctription: Porduct doesnt exists
 *           200:
 *               desctription: Succes.
 *               schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    Title: string
 *                    Director: string
 *                    Released: string
 *                    Genre: string
 *                    AddedBy: string
 *           401:
 *               desctription: User not auth.
 * 
 *                  
 *            
 */
router.post('/v1/movies', validateInput(addMovieSchema),authUser, addMovie);


export default router;

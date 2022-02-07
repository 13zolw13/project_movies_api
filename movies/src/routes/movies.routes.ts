import authUser from "../middleware/User.middleware";
import { addMovie, listOfAllMovies, movieDetails } from "../controllers/movies.controller";

const express = require("express");


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
router.get('/v1/movies', authUser, listOfAllMovies);

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
router.get('/v1/movies/:id', authUser,movieDetails);



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
router.post('/v1/movies', authUser, addMovie);


export default router;

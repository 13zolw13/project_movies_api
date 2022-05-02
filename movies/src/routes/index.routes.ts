import express, {
    Request,
    Response
} from 'express';
import {
    loginUser
} from '../controllers/login.controller';
import validateInput from '../middleware/validateInput.middleware';
import { LoginSchema } from '../schemas/login.schema';
import moviesRoutes from './movies.routes';

const router = express.Router();
router.use('/healtcheck', (req: Request, res: Response) => {
    res.send({
        msg: 'healtcheck'
    })
})

/**
 *  @openapi
 *  /api/v1/login:
 *   post:
 *      tags: 
 *        - login
 *      summary: Endpoint for login.
 *      
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LoginInput'
 *      responses:
 *           404:
 *               descriptions: Product doesn't exists
 *           200:
 *               description: Success.
 *           401:
 *               description: User not auth.
 * 
 *                  
 *            
 */
router.post("/v1/login", validateInput(LoginSchema), loginUser);
router.use(moviesRoutes);

export default router
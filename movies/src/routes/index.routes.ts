import express, {
    Request,
    Response
} from 'express';
import {
    loginUser
} from '../controllers/login.controller';
import moviesRoutes from './movies.routes';

const router = express.Router();
router.use('/healtcheck', (req: Request, res: Response) => {
    res.send({
        msg: 'healtcheck'
    })
})
router.post('/v1/login', loginUser)

router.use(moviesRoutes);




export default router
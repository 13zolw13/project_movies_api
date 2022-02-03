import express, { Request, Response } from 'express';
import moviesRoutes from './movies.routes';

const router = express.Router();
router.use('/healtcheck', (req: Request, res: Response) => {
    res.send({ msg: 'healtcheck' })
})
router.use(moviesRoutes);




export default router
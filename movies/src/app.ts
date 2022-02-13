import 'reflect-metadata';

require('dotenv').config();

import swaggerUI from 'swagger-ui-express';
import express, {
    Request,
    Response
} from "express";
import connectDb from "./utils/connectToDb";
import Routes from './routes/index.routes';
import specs from './utils/swagger';
import swaggerDocs from './utils/swagger';
import cors from 'cors';
import config from 'config';
import cookieParser from 'cookie-parser'
import authenticateUser from './middleware/authentication.middleware';
import log from './utils/logger';
import checkEnvVar from './utils/checkingEnvVar';
import handleError from './middleware/error.middleware';
import { CustomError } from './models/custom-error.models';


const app = express();


checkEnvVar();

const port = config.get<number>('port');
const dbUri = config.get<string>("dbUri");
const cookieKey = config.get<string>("cookieKey")

app.use(express.json());
app.use(cors());
app.use(cookieParser(cookieKey));
app.use(authenticateUser);

app.use('/api', Routes)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.get('/swagger.json', (req: Request, res: Response) => {


    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
});


app.use('*', (req: Request, res: Response) => {
    throw new CustomError(404, 'Not Found');
})
app.use(handleError)

app.listen(port, async () => {
    try {
        await connectDb(dbUri);
        log.info('Connected to db');
        log.info(`app is running ${port}`);

        swaggerDocs(app, port)
    } catch (err: any) {
        log.error(err, 'Error starting server');
        throw new CustomError(404, err.message);
    }

})


export default app;
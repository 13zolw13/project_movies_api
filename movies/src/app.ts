require('dotenv').config()

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

    log.info(`Swagger.json on -> /localhost:${port}/swagger.json`)
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
});

app.use('/*', (req: Request, res: Response) => {
    res.status(404).send({
        msg: 'Not Found'
    })
})
app.listen(port, () => {
    connectDb(dbUri);
    log.info(`app is running ${port}`);

    swaggerDocs(app, port)

})


export default app;
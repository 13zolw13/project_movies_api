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
const app = express();




const port =<number>config.get('port');
const dbUri = <string>config.get("dbUri");

app.use(express.json());
app.use(cors());

app.use('/api', Routes)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.get('/swagger.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
});

app.use('/*', (req: Request, res: Response) => {
    res.status(500).send({
        msg: 'Internal Server Error'
    })
})
app.listen(port, () => {
    connectDb(dbUri);
    console.log(`app is running ${port}`);

    swaggerDocs(app, port)

})


export default app;
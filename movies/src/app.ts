require('dotenv').config()

import swaggerUI from 'swagger-ui-express';
import express, { Request, Response } from "express";
import connectDb from "./utils/connectToDb";
import moviesRoutes from './routes/movies.routes';
import specs from './utils/swagger';
import swaggerDocs from './utils/swagger';

const app = express();




const port = Number(process.env.PORT) || 3001;
const dbUri = <string>process.env.DB_URI;

app.use(express.json());


app.use('/api', moviesRoutes)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.get('/swagger.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
});
app.listen(port, () => {
    connectDb(dbUri);
    console.log(`app is running ${port}`);

    swaggerDocs(app, port)

})


export default app;
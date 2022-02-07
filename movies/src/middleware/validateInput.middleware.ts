import {
    Request,
    Response,
    NextFunction
} from "express";
import {
    AnyZodObject
} from "zod";
import log from "../utils/logger";

const validateInput = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
            cookies:req.cookies,
        })
        next();
    } catch (error: any) {
        log.error(error, 'Error  validation input');
        
        return res.status(400).send(error.error)
    }
}

export default validateInput;
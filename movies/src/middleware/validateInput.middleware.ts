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
            cookies: req.cookies,
            locals: res.locals,
        })
        next();
    } catch (error: any) {
        log.error(error.message, 'Error zod data validation');
        return res.status(400).send(error.error)
    }
}

export default validateInput;
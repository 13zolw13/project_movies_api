import {
    NextFunction,
    Request,
    Response
} from "express";
import { CustomError, ErrorStatus } from "../models/custom-error.models";


const authUser = (req: Request, res: Response, next: NextFunction) => {
    // async
    const {
        token
    } = req.signedCookies;

    const User = res.locals.user;

    if (!token && !User) {
        // res.sendStatus(403);
        throw new CustomError(ErrorStatus.NotAuth);
    }
    return next();
}

export default authUser;
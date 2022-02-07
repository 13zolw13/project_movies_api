import {
    NextFunction,
    Request,
    Response
} from "express";
import {
    encodedUser
} from "../utils/jwt";
import log from "../utils/logger";


const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {

    const {
        token
    } = req.cookies;

    if (!token) {
        return next();
    }
    log.info('middleware-> authenticateUser token', token);

    const user =await  encodedUser(token.toString());
    log.info("middleware-> user", user)
    if (user) {
        log.info('authmiddleware -> authenticateUser ->', user);
        res.locals.user = user;

    }

    return next();
}


export default authenticateUser